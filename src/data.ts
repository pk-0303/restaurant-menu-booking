export interface RestaurantConfig {
  id: string;
  translations: any;
  categories: any[];
  menuData: any[];
}

const defaultTranslations = {
  en: {
    title: "Restaurant POS",
    subtitle: "Authentic & Pure",
    searchPlaceholder: "Search for a dish...",
    searchResults: "Search Results",
    noResults: "No dishes found matching your search.",
    footer: "Thank you for dining with us",
    langBtn: "मराठी",
    addToCart: "Add",
    cart: "Cart",
    total: "Total",
    printBill: "Print Bill",
    emptyCart: "Cart is empty",
    checkout: "Checkout",
    billTitle: "Restaurant - Bill",
    qty: "Qty",
    price: "Price",
    item: "Item",
    subtotal: "Subtotal",
    tax: "Tax (5%)",
    grandTotal: "Grand Total",
    date: "Date",
    time: "Time",
    tableNo: "Table No.",
    waiter: "Waiter",
    roleSelection: "Select Your Role",
    waiterRole: "Waiter",
    counterRole: "Counter / Cashier",
    loginRequired: "Please login to access the POS system",
    loginWithGoogle: "Login with Google",
    tableNoPrompt: "Enter Table Number",
    waiterNamePrompt: "Enter Your Name",
    startOrder: "Start Order",
    openOrders: "Open Orders",
    markAsPaid: "Mark as Paid",
    noOpenOrders: "No open orders currently.",
    orderUpdated: "Order updated successfully!",
    table: "Table",
    items: "Items",
    logout: "Logout",
    sendToKitchen: "Send to Kitchen / Save",
    backToRoles: "Back to Roles",
    billNo: "Bill No."
  },
  mr: {
    title: "रेस्टॉरंट पीओएस",
    subtitle: "अस्सल आणि शुद्ध",
    searchPlaceholder: "डिश शोधा...",
    searchResults: "शोध परिणाम",
    noResults: "तुमच्या शोधाशी जुळणारी कोणतीही डिश आढळली नाही.",
    footer: "आमच्याकडे जेवल्याबद्दल धन्यवाद",
    langBtn: "English",
    addToCart: "जोडा",
    cart: "कार्ट",
    total: "एकूण",
    printBill: "बिल प्रिंट करा",
    emptyCart: "कार्ट रिकामी आहे",
    checkout: "चेकआउट",
    billTitle: "रेस्टॉरंट - बिल",
    qty: "प्रमाण",
    price: "किंमत",
    item: "पदार्थ",
    subtotal: "उप-एकूण",
    tax: "कर (५%)",
    grandTotal: "एकूण रक्कम",
    date: "तारीख",
    time: "वेळ",
    tableNo: "टेबल क्र.",
    waiter: "वेटर",
    roleSelection: "तुमची भूमिका निवडा",
    waiterRole: "वेटर",
    counterRole: "काउंटर / कॅशियर",
    loginRequired: "POS प्रणाली वापरण्यासाठी कृपया लॉग इन करा",
    loginWithGoogle: "Google सह लॉग इन करा",
    tableNoPrompt: "टेबल क्रमांक प्रविष्ट करा",
    waiterNamePrompt: "तुमचे नाव प्रविष्ट करा",
    startOrder: "ऑर्डर सुरू करा",
    openOrders: "खुल्या ऑर्डर्स",
    markAsPaid: "पैसे दिले म्हणून चिन्हांकित करा",
    noOpenOrders: "सध्या कोणतीही खुली ऑर्डर नाही.",
    orderUpdated: "ऑर्डर यशस्वीरित्या अद्यतनित केली!",
    table: "टेबल",
    items: "पदार्थ",
    logout: "लॉग आउट करा",
    sendToKitchen: "किचनमध्ये पाठवा / सेव्ह करा",
    backToRoles: "भूमिकांवर परत जा",
    billNo: "बिल क्र."
  }
};

const defaultCategories = [
  { id: 0, en: "Mix Veg Special", mr: "मिक्स व्हेज स्पेशल" },
  { id: 1, en: "Snacks / Salad", mr: "स्नॅक्स / सॅलड" },
  { id: 2, en: "Soups", mr: "सूप" },
  { id: 3, en: "Tandoori Starter", mr: "तंदूरी स्टार्टर" },
  { id: 4, en: "Pulao Biryani", mr: "पुलाव बिर्याणी" },
  { id: 5, en: "Dal (Lentil)", mr: "डाळ" },
  { id: 6, en: "Rice/Noodles", mr: "राईस / नूडल्स" },
  { id: 7, en: "Veg Chinese Starter", mr: "व्हेज चायनीज स्टार्टर" },
  { id: 8, en: "Kaju Special", mr: "काजू स्पेशल" },
  { id: 9, en: "Kaju Paneer Special", mr: "काजू पनीर स्पेशल" },
  { id: 10, en: "Mushroom Special", mr: "मशरूम स्पेशल" },
  { id: 11, en: "Roti / Indian Breads", mr: "रोटी / इंडियन ब्रेड्स" },
  { id: 12, en: "Cold Drinks", mr: "कोल्ड ड्रिंक्स" },
  { id: 13, en: "Paneer Special", mr: "पनीर स्पेशल" },
  { id: 14, en: "Maharashtrian Dishes", mr: "महाराष्ट्रीयन डिशेस" },
  { id: 15, en: "Jain Dishes", mr: "जैन डिशेस" }
];

const defaultMenuData = [
  // Mix Veg Special
  { id: "mv1", en: "Restaurant Special Veg", mr: "रेस्टॉरंट स्पेशल व्हेज", price: 330, categoryId: 0 },
  { id: "mv2", en: "Veg Bajirao", mr: "व्हेज बाजीराव", price: 230, categoryId: 0 },
  { id: "mv3", en: "Veg Angara", mr: "व्हेज अंगारा", price: 230, categoryId: 0 },
  { id: "mv4", en: "Veg Tawa", mr: "व्हेज तवा", price: 230, categoryId: 0 },
  { id: "mv5", en: "Veg Patiala", mr: "व्हेज पटियाला", price: 250, categoryId: 0 },
  { id: "mv6", en: "Veg Makhanwala", mr: "व्हेज माखनवाला", price: 200, categoryId: 0 },
  { id: "mv7", en: "Mix Veg", mr: "मिक्स व्हेज", price: 200, categoryId: 0 },
  { id: "mv8", en: "Veg Kothimbir", mr: "व्हेज कोथिंबीर", price: 250, categoryId: 0 },
  { id: "mv9", en: "Veg Kadai", mr: "व्हेज कढई", price: 210, categoryId: 0 },
  { id: "mv10", en: "Veg Kolhapuri", mr: "व्हेज कोल्हापुरी", price: 210, categoryId: 0 },
  { id: "mv11", en: "Veg Handi", mr: "व्हेज हंडी", price: 250, categoryId: 0 },
  { id: "mv12", en: "Veg Malwani", mr: "व्हेज मालवणी", price: 300, categoryId: 0 },
  { id: "mv13", en: "Veg Maratha", mr: "व्हेज मराठा", price: 220, categoryId: 0 },
  { id: "mv14", en: "Veg Maharaja", mr: "व्हेज महाराजा", price: 250, categoryId: 0 },
  { id: "mv15", en: "Veg Dilruba", mr: "व्हेज दिलरुबा", price: 280, categoryId: 0 },
  { id: "mv16", en: "Veg Keema Masala", mr: "व्हेज खिमा मसाला", price: 230, categoryId: 0 },
  { id: "mv17", en: "Veg Bhuna", mr: "व्हेज भुना", price: 220, categoryId: 0 },
  { id: "mv18", en: "Veg Chilly-milly", mr: "व्हेज चिली-मिली", price: 250, categoryId: 0 },
  { id: "mv19", en: "Veg Banjara", mr: "व्हेज बंजारा", price: 240, categoryId: 0 },
  { id: "mv20", en: "Veg Diwani Handi", mr: "व्हेज दिवाणी हंडी", price: 260, categoryId: 0 },
  { id: "mv21", en: "Malai Kofta", mr: "मलाई कोफ्ता", price: 240, categoryId: 0 },
  { id: "mv22", en: "Green Peas Masala", mr: "ग्रीन पीस मसाला", price: 180, categoryId: 0 },
  { id: "mv23", en: "Afghani Kofta", mr: "अफगाणी कोफ्ता", price: 260, categoryId: 0 },
  { id: "mv24", en: "Dum Aloo Pujabi", mr: "दम आलू पंजाबी", price: 220, categoryId: 0 },
  { id: "mv25", en: "Mushroom Masala", mr: "मशरूम मसाला", price: 240, categoryId: 0 },
  { id: "mv26", en: "Plain Palak", mr: "प्लेन पालक", price: 180, categoryId: 0 },
  { id: "mv27", en: "Lasooni Palak", mr: "लसूणी पालक", price: 210, categoryId: 0 },
  
  // Jain Dishes
  { id: "jd1", en: "Jain Veg", mr: "जैन व्हेज", price: 220, categoryId: 15 },
  { id: "jd2", en: "Jain Paneer", mr: "जैन पनीर", price: 250, categoryId: 15 },
  { id: "jd3", en: "Jain Kaju", mr: "जैन काजू", price: 280, categoryId: 15 },
  { id: "jd4", en: "Jain Dal Fry", mr: "जैन दाल फ्राय", price: 150, categoryId: 15 },
  { id: "jd5", en: "Jain Green Peas", mr: "जैन ग्रीन पीस", price: 190, categoryId: 15 },
  { id: "jd6", en: "Jain Bhuna", mr: "जैन भुना", price: 220, categoryId: 15 },

  // Snacks / Salad
  { id: "ss1", en: "Bisleri (Packed Water)", mr: "बिसलेरी (पाण्याची बाटली)", price: 20, categoryId: 1 },
  { id: "ss2", en: "Roasted Papad", mr: "रोस्टेड पापड", price: 30, categoryId: 1 },
  { id: "ss3", en: "Fried Papad", mr: "फ्राईड पापड", price: 35, categoryId: 1 },
  { id: "ss4", en: "Masala Papad", mr: "मसाला पापड", price: 50, categoryId: 1 },
  { id: "ss5", en: "Cheese Masala Papad", mr: "चीज मसाला पापड", price: 70, categoryId: 1 },
  { id: "ss6", en: "French Fries", mr: "फ्रेंच फ्राईज", price: 100, categoryId: 1 },
  { id: "ss7", en: "Peri Peri French Fries", mr: "पेरी पेरी फ्रेंच फ्राईज", price: 120, categoryId: 1 },
  { id: "ss8", en: "Green Salad", mr: "ग्रीन सॅलड", price: 90, categoryId: 1 },
  { id: "ss9", en: "Buttermilk", mr: "ताक", price: 40, categoryId: 1 },
  { id: "ss10", en: "Masala Buttermilk", mr: "मसाला ताक", price: 45, categoryId: 1 },
  { id: "ss11", en: "Curd", mr: "दही", price: 60, categoryId: 1 },
  { id: "ss12_1", en: "Mix Raita", mr: "मिक्स रायता", price: 80, categoryId: 1 },
  { id: "ss12_2", en: "Boondi Raita", mr: "बूंदी रायता", price: 100, categoryId: 1 },
  
  // Soups
  { id: "sp1", en: "Veg Manchow Soup", mr: "व्हेज मंचाव सूप", price: 110, categoryId: 2 },
  { id: "sp2", en: "Hot & Sour Soup", mr: "हॉट अँड सोर सूप", price: 110, categoryId: 2 },
  { id: "sp3", en: "Veg Clear Soup", mr: "व्हेज क्लिअर सूप", price: 100, categoryId: 2 },
  { id: "sp4", en: "Tomato Soup", mr: "टोमॅटो सूप", price: 120, categoryId: 2 },
  { id: "sp5", en: "Sweet Corn Soup", mr: "स्वीट कॉर्न सूप", price: 110, categoryId: 2 },
  { id: "sp6", en: "Veg Noodles Soup", mr: "व्हेज नूडल्स सूप", price: 110, categoryId: 2 },
  { id: "sp7", en: "Cream Of Mushroom Soup", mr: "क्रीम ऑफ मशरूम सूप", price: 120, categoryId: 2 },
  { id: "sp8", en: "Palak (spinach) Soup", mr: "पालक सूप", price: 120, categoryId: 2 },
  { id: "sp9", en: "Mushroom Soup", mr: "मशरूम सूप", price: 120, categoryId: 2 },
  
  // Tandoori Starter
  { id: "ts1", en: "Achari Cottage Cheese Tikka", mr: "अचारी कॉटेज चीज टिक्का", price: 250, categoryId: 3 },
  { id: "ts2", en: "Paneer Tikka", mr: "पनीर टिक्का", price: 240, categoryId: 3 },
  { id: "ts3", en: "Hazaari Paneer Tikka", mr: "हजारी पनीर टिक्का", price: 250, categoryId: 3 },
  { id: "ts4", en: "Pudina Cottage Cheese Tikka", mr: "पुदिना कॉटेज चीज टिक्का", price: 240, categoryId: 3 },
  { id: "ts5", en: "Charcoal Smoked Banjara Paneer Tikka", mr: "चारकोल स्मोक्ड बंजारा पनीर टिक्का", price: 250, categoryId: 3 },
  { id: "ts6", en: "Paneer Cottage Kebab", mr: "पनीर कॉटेज कबाब", price: 250, categoryId: 3 },
  { id: "ts7", en: "Tiranga Paneer Tikka", mr: "तिरंगा पनीर टिक्का", price: 250, categoryId: 3 },
  { id: "ts8", en: "Angara Paneer Tikka", mr: "अंगारा पनीर टिक्का", price: 240, categoryId: 3 },
  { id: "ts9", en: "Classic Stuffed Paneer", mr: "क्लासिक स्टफ्ड पनीर", price: 250, categoryId: 3 },
  { id: "ts10", en: "Malai Paneer Tikka", mr: "मलाई पनीर टिक्का", price: 250, categoryId: 3 },
  { id: "ts11", en: "Classic Button Mushroom", mr: "क्लासिक बटन मशरूम", price: 240, categoryId: 3 },
  { id: "ts12", en: "Classic Honey Bbq Mushroom", mr: "क्लासिक हनी बीबीक्यू मशरूम", price: 230, categoryId: 3 },
  { id: "ts13", en: "Charcoal Smoked Stuffed Mushrrom", mr: "चारकोल स्मोक्ड स्टफ्ड मशरूम", price: 240, categoryId: 3 },
  { id: "ts14", en: "Palak Corn Seekh Kebab", mr: "पालक कॉर्न सीख कबाब", price: 240, categoryId: 3 },
  { id: "ts15", en: "Aloo Ki Najakat", mr: "आलू की नजाकत", price: 230, categoryId: 3 },
  { id: "ts16", en: "Aloo Tikka", mr: "आलू टिक्का", price: 230, categoryId: 3 },
  { id: "ts17", en: "Tandoori Malai Soya Chaap", mr: "तंदूरी मलाई सोया चाप", price: 230, categoryId: 3 },
  { id: "ts18", en: "Tandoori Soya Chaap", mr: "तंदूरी सोया चाप", price: 230, categoryId: 3 },
  { id: "ts19", en: "Garlic Soya Chaap", mr: "गार्लिक सोया चाप", price: 240, categoryId: 3 },
  
  // Maharashtrian Dishes
  { id: "md1", en: "Aloo Matar", mr: "आलू मटार", price: 180, categoryId: 14 },
  { id: "md2", en: "Baingan Masala", mr: "वांगं मसाला", price: 180, categoryId: 14 },
  { id: "md3", en: "Baingan Curry", mr: "वांग्याची रस्सा भाजी", price: 170, categoryId: 14 },
  { id: "md4", en: "Baingan Bharta", mr: "वांग्याचं भरीत", price: 180, categoryId: 14 },
  { id: "md5", en: "Shev Bhaji", mr: "शेव भाजी", price: 180, categoryId: 14 },

  // Pulao Biryani
  { id: "pb1", en: "Curd Rice", mr: "दही भात", price: 160, categoryId: 4 },
  { id: "pb2", en: "Kaju Biryani", mr: "काजू बिर्याणी", price: 250, categoryId: 4 },
  { id: "pb3", en: "Veg Pulav", mr: "व्हेज पुलाव", price: 180, categoryId: 4 },
  { id: "pb4", en: "Kaju Plav", mr: "काजू पुलाव", price: 220, categoryId: 4 },
  { id: "pb5", en: "Paneer Pulav", mr: "पनीर पुलाव", price: 200, categoryId: 4 },
  { id: "pb6", en: "Veg Matka Biryani", mr: "व्हेज मटका बिर्याणी", price: 230, categoryId: 4 },
  { id: "pb7", en: "Hyderabadi Biryani", mr: "हैदराबादी बिर्याणी", price: 230, categoryId: 4 },
  { id: "pb8", en: "Paneer Matka Biryani", mr: "पनीर मटका बिर्याणी", price: 250, categoryId: 4 },
  { id: "pb9", en: "Kaju Matka Biryani", mr: "काजू मटका बिर्याणी", price: 260, categoryId: 4 },
  { id: "pb10", en: "Veg Biryani", mr: "व्हेज बिर्याणी", price: 210, categoryId: 4 },
  
  // Dal (Lentil)
  { id: "dl1", en: "Plain Dal", mr: "प्लेन डाळ", price: 100, categoryId: 5 },
  { id: "dl2", en: "Dal Fry", mr: "डाळ फ्राय", price: 110, categoryId: 5 },
  { id: "dl3", en: "Dal Tadka", mr: "डाळ तडका", price: 140, categoryId: 5 },
  { id: "dl4", en: "Dal Kolhapuri", mr: "डाळ कोल्हापुरी", price: 150, categoryId: 5 },
  { id: "dl5", en: "Dal Palak", mr: "डाळ पालक", price: 150, categoryId: 5 },
  { id: "dl6", en: "Dal Khichdi Butter", mr: "डाळ खिचडी बटर", price: 180, categoryId: 5 },
  { id: "dl7", en: "Palak Khichdi", mr: "पालक खिचडी", price: 190, categoryId: 5 },

  // Rice/Noodles
  { id: "rn1_1", en: "Steam Rice (Half)", mr: "स्टीम राईस (हाफ)", price: 90, categoryId: 6 },
  { id: "rn1_2", en: "Steam Rice (Full)", mr: "स्टीम राईस (फुल)", price: 110, categoryId: 6 },
  { id: "rn2_1", en: "Jeera Rice (Half)", mr: "जिरा राईस (हाफ)", price: 100, categoryId: 6 },
  { id: "rn2_2", en: "Jeera Rice (Full)", mr: "जिरा राईस (फुल)", price: 120, categoryId: 6 },
  { id: "rn3", en: "Masala Rice", mr: "मसाला राईस", price: 190, categoryId: 6 },
  { id: "rn4", en: "Veg Schezwan Rice", mr: "व्हेज शेजवान राईस", price: 190, categoryId: 6 },
  { id: "rn5", en: "Veg Fried Rice", mr: "व्हेज फ्राईड राईस", price: 180, categoryId: 6 },
  { id: "rn6", en: "Veg Manchurian Rice", mr: "व्हेज मंचुरियन राईस", price: 190, categoryId: 6 },
  { id: "rn7", en: "Veg Schezwan Triple Rice", mr: "व्हेज शेजवान ट्रिपल राईस", price: 240, categoryId: 6 },
  { id: "rn8", en: "Veg Singapore Rice", mr: "व्हेज सिंगापूर राईस", price: 220, categoryId: 6 },
  { id: "rn9", en: "Veg Hakka Noodles", mr: "व्हेज हक्का नूडल्स", price: 200, categoryId: 6 },
  { id: "rn10", en: "Veg Schezwan Noodles", mr: "व्हेज शेजवान नूडल्स", price: 200, categoryId: 6 },
  { id: "rn11", en: "Triple Schezwan Noodles", mr: "ट्रिपल शेजवान नूडल्स", price: 210, categoryId: 6 },
  
  // Veg Chinese Starter
  { id: "vc1", en: "Veg Manchurian (Gravy)", mr: "व्हेज मंचुरियन (ग्रेव्ही)", price: 210, categoryId: 7 },
  { id: "vc2", en: "Veg Manchurian (Dry)", mr: "व्हेज मंचुरियन (ड्राय)", price: 190, categoryId: 7 },
  { id: "vc3", en: "Gobi Manchurian", mr: "गोबी मंचुरियन", price: 190, categoryId: 7 },
  { id: "vc4", en: "Veg Lollipop", mr: "व्हेज लॉलीपॉप", price: 210, categoryId: 7 },
  { id: "vc5", en: "Veg 65", mr: "व्हेज ६५", price: 210, categoryId: 7 },
  { id: "vc6", en: "Veg Crispy", mr: "व्हेज क्रिस्पी", price: 230, categoryId: 7 },
  { id: "vc7", en: "Veg Chilly", mr: "व्हेज चिली", price: 210, categoryId: 7 },
  { id: "vc8", en: "Paneer Manchurian", mr: "पनीर मंचुरियन", price: 240, categoryId: 7 },
  { id: "vc9", en: "Paneer Chilly", mr: "पनीर चिली", price: 240, categoryId: 7 },
  { id: "vc10", en: "Paneer Pakoda", mr: "पनीर पकोडा", price: 230, categoryId: 7 },
  { id: "vc11", en: "Paneer Chilly (Gravy)", mr: "पनीर चिली (ग्रेव्ही)", price: 260, categoryId: 7 },
  { id: "vc12", en: "Paneer Stick Schezwan", mr: "पनीर स्टिक शेजवान", price: 270, categoryId: 7 },
  { id: "vc13", en: "Paneer 65", mr: "पनीर ६५", price: 250, categoryId: 7 },
  { id: "vc14", en: "Paneer Crispy", mr: "पनीर क्रिस्पी", price: 250, categoryId: 7 },
  { id: "vc15", en: "Paneer Hot Pan", mr: "पनीर हॉट पॅन", price: 250, categoryId: 7 },
  { id: "vc16", en: "Paneer Chatpata", mr: "पनीर चटपटा", price: 250, categoryId: 7 },
  { id: "vc17", en: "Paneer Satay", mr: "पनीर साते", price: 250, categoryId: 7 },
  { id: "vc18", en: "Soyachilly", mr: "सोया चिली", price: 210, categoryId: 7 },
  { id: "vc19", en: "Honey Chilly Potato", mr: "हनी चिली पोटॅटो", price: 220, categoryId: 7 },
  { id: "vc20", en: "Mushroom Chilly", mr: "मशरूम चिली", price: 230, categoryId: 7 },
  { id: "vc21", en: "Baby Corn Chilly", mr: "बेबी कॉर्न चिली", price: 230, categoryId: 7 },
  { id: "vc22", en: "Veg Junglee", mr: "व्हेज जंगली", price: 230, categoryId: 7 },
  { id: "vc23", en: "Gobi 65", mr: "गोबी ६५", price: 210, categoryId: 7 },
  
  // Kaju Special
  { id: "ks1", en: "Kaju Ghotala", mr: "काजू घोटाळा", price: 360, categoryId: 8 },
  { id: "ks2", en: "Kaju Masala", mr: "काजू मसाला", price: 240, categoryId: 8 },
  { id: "ks3", en: "Kaju Tawa", mr: "काजू तवा", price: 230, categoryId: 8 },
  { id: "ks4", en: "Kaju Curry (sweet/spicy)", mr: "काजू करी (गोड/तिखट)", price: 220, categoryId: 8 },
  { id: "ks5", en: "Kaju Malwani", mr: "काजू मालवणी", price: 330, categoryId: 8 },
  { id: "ks6", en: "Kaju Bajirao", mr: "काजू बाजीराव", price: 250, categoryId: 8 },
  { id: "ks7", en: "Kaju Mastani", mr: "काजू मस्तानी", price: 250, categoryId: 8 },
  { id: "ks8", en: "Cheese Kaju Masala", mr: "चीज काजू मसाला", price: 270, categoryId: 8 },
  { id: "ks9", en: "Kaju Handi", mr: "काजू हंडी", price: 270, categoryId: 8 },
  { id: "ks10", en: "Kaju Makhani", mr: "काजू मखनी", price: 240, categoryId: 8 },
  { id: "ks11", en: "Kaju Hungama", mr: "काजू हंगामा", price: 260, categoryId: 8 },

  // Kaju Paneer Special
  { id: "kps1", en: "Kaju Paneer Bajirao", mr: "काजू पनीर बाजीराव", price: 250, categoryId: 9 },
  { id: "kps2", en: "Kaju Paneer Mastani", mr: "काजू पनीर मस्तानी", price: 250, categoryId: 9 },
  { id: "kps3", en: "Kaju Paneer Masala", mr: "काजू पनीर मसाला", price: 240, categoryId: 9 },
  { id: "kps4", en: "Kaju Paneer Handi", mr: "काजू पनीर हंडी", price: 270, categoryId: 9 },
  { id: "kps5", en: "Kaju Paneer Tawa", mr: "काजू पनीर तवा", price: 240, categoryId: 9 },
  { id: "kps6", en: "Kaju Paneer Malwani", mr: "काजू पनीर मालवणी", price: 320, categoryId: 9 },
  { id: "kps7", en: "Kaju Paneer Hungama", mr: "काजू पनीर हंगामा", price: 260, categoryId: 9 },
  { id: "kps8", en: "Kaji Paneer Ghotala", mr: "काजू पनीर घोटाळा", price: 350, categoryId: 9 },
  { id: "kps9", en: "Rassa Handi", mr: "रस्सा हंडी", price: 130, categoryId: 9 },

  // Mushroom Special
  { id: "ms1", en: "Mushroom Masala", mr: "मशरूम मसाला", price: 240, categoryId: 10 },
  { id: "ms2", en: "Tawa Mushroom", mr: "तवा मशरूम", price: 230, categoryId: 10 },
  { id: "ms3", en: "Cheese Mushroom", mr: "चीज मशरूम", price: 230, categoryId: 10 },
  { id: "ms4", en: "Baby Corn Mushroom Masala", mr: "बेबी कॉर्न मशरूम मसाला", price: 240, categoryId: 10 },
  { id: "ms5", en: "Mushroom Keema Masala", mr: "मशरूम खिमा मसाला", price: 240, categoryId: 10 },
  { id: "ms6", en: "Mushroom Handi", mr: "मशरूम हंडी", price: 260, categoryId: 10 },
  { id: "ms7", en: "Kadai Mushroom", mr: "कढई मशरूम", price: 230, categoryId: 10 },
  
  // Roti / Indian Breads
  { id: "rb1", en: "Roti", mr: "रोटी", price: 25, categoryId: 11 },
  { id: "rb2", en: "Butter Roti", mr: "बटर रोटी", price: 30, categoryId: 11 },
  { id: "rb3_1", en: "Naan", mr: "नान", price: 50, categoryId: 11 },
  { id: "rb3_2", en: "Butter Naan", mr: "बटर नान", price: 60, categoryId: 11 },
  { id: "rb4_1", en: "Garlic Naan", mr: "गार्लिक नान", price: 70, categoryId: 11 },
  { id: "rb4_2", en: "Garlic Butter Naan", mr: "गार्लिक बटर नान", price: 80, categoryId: 11 },
  { id: "rb5_1", en: "Cheese Garlic Naan", mr: "चीज गार्लिक नान", price: 90, categoryId: 11 },
  { id: "rb5_2", en: "Cheesy Garlic Butter Naan", mr: "चीजी गार्लिक बटर नान", price: 95, categoryId: 11 },
  { id: "rb6", en: "Laccha Butter Paratha", mr: "लच्छा बटर पराठा", price: 60, categoryId: 11 },
  { id: "rb7_1", en: "Kulcha", mr: "कुलचा", price: 40, categoryId: 11 },
  { id: "rb7_2", en: "Butter Kulcha", mr: "बटर कुलचा", price: 45, categoryId: 11 },
  { id: "rb8", en: "Paneer Paratha", mr: "पनीर पराठा", price: 110, categoryId: 11 },
  { id: "rb9", en: "Aloo Paratha", mr: "आलू पराठा", price: 90, categoryId: 11 },
  { id: "rb10", en: "Stuffed Paratha", mr: "स्टफ्ड पराठा", price: 100, categoryId: 11 },
  { id: "rb11", en: "Wheat Roti", mr: "गव्हाची रोटी", price: 30, categoryId: 11 },
  { id: "rb12", en: "Wheat Butter Roti", mr: "गव्हाची बटर रोटी", price: 35, categoryId: 11 },
  { id: "rb13", en: "Missi Roti", mr: "मिस्सी रोटी", price: 70, categoryId: 11 },
  { id: "rb14", en: "Gobi Paratha", mr: "गोबी पराठा", price: 100, categoryId: 11 },

  // Cold Drinks
  { id: "cd1", en: "200 ml Cold Drink", mr: "२०० मिली कोल्ड ड्रिंक", price: 20, categoryId: 12 },
  { id: "cd2", en: "600 ml Cold Drink", mr: "६०० मिली कोल्ड ड्रिंक", price: 50, categoryId: 12 },
  
  // Paneer Special
  { id: "ps1", en: "Paneer Lodges", mr: "पनीर लॉजेस", price: 330, categoryId: 13 },
  { id: "ps2", en: "Paneer Tufani", mr: "पनीर तुफानी", price: 260, categoryId: 13 },
  { id: "ps3", en: "Paneer Bhurji", mr: "पनीर भुर्जी", price: 240, categoryId: 13 },
  { id: "ps4", en: "Paneer Kofta", mr: "पनीर कोफ्ता", price: 270, categoryId: 13 },
  { id: "ps5", en: "Paneer Ghotala", mr: "पनीर घोटाळा", price: 350, categoryId: 13 },
  { id: "ps6", en: "Paneer Maratha", mr: "पनीर मराठा", price: 240, categoryId: 13 },
  { id: "ps7", en: "Paneer Day Night Kofta", mr: "पनीर डे नाईट कोफ्ता", price: 310, categoryId: 13 },
  { id: "ps8", en: "Paneer Rajwadi", mr: "पनीर रजवाडी", price: 300, categoryId: 13 },
  { id: "ps9", en: "Paneer Lajawab", mr: "पनीर लाजवाब", price: 300, categoryId: 13 },
  { id: "ps10", en: "Paneer Green Garden", mr: "पनीर ग्रीन गार्डन", price: 310, categoryId: 13 },
  { id: "ps11", en: "Paneer Hungama", mr: "पनीर हंगामा", price: 260, categoryId: 13 },
  { id: "ps12", en: "Paneer Chingari", mr: "पनीर ठिणगी (चिंगारी)", price: 230, categoryId: 13 },
  { id: "ps13", en: "Paneer Masala", mr: "पनीर मसाला", price: 220, categoryId: 13 },
  { id: "ps14", en: "Paneer Masala (grated)", mr: "पनीर मसाला (किसलेले)", price: 260, categoryId: 13 },
  { id: "ps15", en: "Paneer Butter Masala", mr: "पनीर बटर मसाला", price: 220, categoryId: 13 },
  { id: "ps16", en: "Paneer Butter Masala (grated)", mr: "पनीर बटर मसाला (किसलेले)", price: 260, categoryId: 13 },
  { id: "ps17", en: "Paneer Tikka Masala", mr: "पनीर टिक्का मसाला", price: 230, categoryId: 13 },
  { id: "ps18", en: "Paneer Kadai", mr: "पनीर कढई", price: 220, categoryId: 13 },
  { id: "ps19", en: "Paneer Handi", mr: "पनीर हंडी", price: 260, categoryId: 13 },
  { id: "ps20", en: "Paneer Malwani", mr: "पनीर मालवणी", price: 310, categoryId: 13 },
  { id: "ps21", en: "Mutter Paneer", mr: "मटार पनीर", price: 220, categoryId: 13 },
  { id: "ps22", en: "Palak Paneer", mr: "पालक पनीर", price: 220, categoryId: 13 },
  { id: "ps23", en: "Paneer Makhanwala", mr: "पनीर माखनवाला", price: 230, categoryId: 13 },
  { id: "ps24", en: "Paneer Bajirao", mr: "पनीर बाजीराव", price: 250, categoryId: 13 },
  { id: "ps25", en: "Paneer Mastani", mr: "पनीर मस्तानी", price: 260, categoryId: 13 },
  { id: "ps26", en: "Paneer Pasanda", mr: "पनीर पसंदा", price: 280, categoryId: 13 },
  { id: "ps27", en: "Paneer Mughlai", mr: "पनीर मुघलाई", price: 240, categoryId: 13 },
  { id: "ps28", en: "Paneer Lahori", mr: "पनीर लाहोरी", price: 280, categoryId: 13 },
  { id: "ps29", en: "Paneer Patiala", mr: "पनीर पटियाला", price: 270, categoryId: 13 },
  { id: "ps30", en: "Paneer Kolhapuri", mr: "पनीर कोल्हापुरी", price: 240, categoryId: 13 },
  { id: "ps31", en: "Paneer Do Pyaza", mr: "पनीर दो प्याजा", price: 240, categoryId: 13 },
  { id: "ps32", en: "Paneer Tawa", mr: "पनीर तवा", price: 250, categoryId: 13 },
  { id: "ps33", en: "Cheese Paneer Masala", mr: "चीज पनीर मसाला", price: 270, categoryId: 13 },
  { id: "ps34", en: "Paneer Banjara", mr: "पनीर बंजारा", price: 260, categoryId: 13 },
  { id: "ps35", en: "Paneer Diwani Handi", mr: "पनीर दिवाणी हंडी", price: 280, categoryId: 13 }
];

// Example of a second restaurant's configuration
const burgerTranslations = {
  en: {
    ...defaultTranslations.en,
    title: "Burger Joint",
    subtitle: "Best Burgers in Town",
    billTitle: "Burger Joint - Bill",
  },
  mr: {
    ...defaultTranslations.mr,
    title: "बर्गर जॉइंट",
    subtitle: "शहरातील सर्वोत्तम बर्गर",
    billTitle: "बर्गर जॉइंट - बिल",
  }
};

const burgerCategories = [
  { id: 0, en: "Burgers", mr: "बर्गर" },
  { id: 1, en: "Sides", mr: "साईड्स" },
  { id: 2, en: "Drinks", mr: "ड्रिंक्स" }
];

const burgerMenuData = [
  { id: "b1", en: "Classic Cheeseburger", mr: "क्लासिक चीजबर्गर", price: 150, categoryId: 0 },
  { id: "b2", en: "Double Patty Burger", mr: "डबल पॅटी बर्गर", price: 220, categoryId: 0 },
  { id: "b3", en: "Veggie Burger", mr: "व्हेजी बर्गर", price: 130, categoryId: 0 },
  { id: "s1", en: "French Fries", mr: "फ्रेंच फ्राईज", price: 80, categoryId: 1 },
  { id: "s2", en: "Onion Rings", mr: "कांदा भजी", price: 100, categoryId: 1 },
  { id: "d1", en: "Cola", mr: "कोला", price: 50, categoryId: 2 },
  { id: "d2", en: "Milkshake", mr: "मिल्कशेक", price: 120, categoryId: 2 }
];

export const getRestaurantConfig = (email: string | null | undefined): RestaurantConfig => {
  const emailToRestaurantId: Record<string, string> = {
    // Add specific emails here to route them to different restaurants
    "pushkarkadu03@gmail.com": "restaurant_1", // Default to the main restaurant
    "burger@example.com": "restaurant_2"
  };

  const restaurantId = email ? (emailToRestaurantId[email.toLowerCase()] || "restaurant_1") : "restaurant_1";

  if (restaurantId === "restaurant_2") {
    return {
      id: "restaurant_2",
      translations: burgerTranslations,
      categories: burgerCategories,
      menuData: burgerMenuData
    };
  }

  // Default / Restaurant 1
  return {
    id: "restaurant_1",
    translations: defaultTranslations,
    categories: defaultCategories,
    menuData: defaultMenuData
  };
};
