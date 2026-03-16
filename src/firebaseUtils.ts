import { collection, doc, setDoc, updateDoc, onSnapshot, query, where, serverTimestamp, getDocs } from 'firebase/firestore';
import { db, auth } from './firebase';

export interface OrderItem {
  id: string;
  en: string;
  mr: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  tableNo: string;
  waiterName: string;
  status: 'open' | 'paid';
  items: OrderItem[];
  createdAt: any;
  updatedAt: any;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo?: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const getOrdersCollection = (restaurantId: string) => {
  return collection(db, `restaurants/${restaurantId}/orders`);
};

export const subscribeToOpenOrders = (restaurantId: string, callback: (orders: Order[]) => void) => {
  const q = query(getOrdersCollection(restaurantId), where('status', '==', 'open'));
  return onSnapshot(q, (snapshot) => {
    const orders: Order[] = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    // Sort client-side to avoid composite index requirement
    orders.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis() || 0;
      const timeB = b.updatedAt?.toMillis() || 0;
      return timeB - timeA;
    });
    callback(orders);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, `restaurants/${restaurantId}/orders`);
  });
};

export const createOrUpdateOrder = async (restaurantId: string, tableNo: string, waiterName: string, items: OrderItem[]) => {
  try {
    // Check if there's an open order for this table
    const q = query(getOrdersCollection(restaurantId), where('tableNo', '==', tableNo), where('status', '==', 'open'));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      // Update existing order
      const orderDoc = snapshot.docs[0];
      const existingData = orderDoc.data() as Order;
      
      // Merge items
      const mergedItems = [...existingData.items];
      items.forEach(newItem => {
        const existingItemIndex = mergedItems.findIndex(i => i.id === newItem.id);
        if (existingItemIndex >= 0) {
          mergedItems[existingItemIndex].quantity += newItem.quantity;
        } else {
          mergedItems.push(newItem);
        }
      });

      await updateDoc(doc(db, `restaurants/${restaurantId}/orders`, orderDoc.id), {
        items: mergedItems,
        waiterName, // Update waiter name in case a different waiter adds to it
        updatedAt: serverTimestamp()
      });
      return orderDoc.id;
    } else {
      // Create new order
      const newOrderRef = doc(getOrdersCollection(restaurantId));
      await setDoc(newOrderRef, {
        tableNo,
        waiterName,
        status: 'open',
        items,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return newOrderRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `restaurants/${restaurantId}/orders`);
  }
};

export const getPaidOrders = async (restaurantId: string) => {
  try {
    const q = query(getOrdersCollection(restaurantId), where('status', '==', 'paid'));
    const snapshot = await getDocs(q);
    const orders: Order[] = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    // Sort by updated time descending
    orders.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis() || 0;
      const timeB = b.updatedAt?.toMillis() || 0;
      return timeB - timeA;
    });
    return orders;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `restaurants/${restaurantId}/orders`);
    return [];
  }
};

export const markOrderAsPaid = async (restaurantId: string, orderId: string) => {
  try {
    await updateDoc(doc(db, `restaurants/${restaurantId}/orders`, orderId), {
      status: 'paid',
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `restaurants/${restaurantId}/orders/${orderId}`);
  }
};
