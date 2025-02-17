const model = require('../model/adminModel')
const schema = require('../model/adminModel')
const fs = require('fs')

// 1. Admin Login Route (adminLogin)

module.exports.adminLogin = (req, res) => {
  res.render('adminLogin') // उपयोग: यह रूट लॉगिन पेज को दिखाने के लिए है।
}

//2. Login Authentication (login) //उद्देश्य: यह फंक्शन एडमिन का लॉगिन प्रॉसेस हैंडल करता है।

module.exports.login = async (req, res) => {
  await schema.findOne({}).then((data) => {    //यह findOne() का इस्तेमाल करके डेटाबेस में एडमिन को ढूँढ़ता है।
    if (data.email === req.body.email && data.password === req.body.password) {
      res.cookie('adminData', data) //अगर ईमेल और पासवर्ड मैच करते हैं, तो adminData नाम का कूकी सेट किया जाता है और एडमिन को डैशबोर्ड पेज (/dashBoard) पर रीडायरेक्ट किया जाता है।
      res.redirect('/dashBoard')
    } else {
      res.redirect('/') //अगर लॉगिन फेल हो जाता है, तो यूज़र को होम पेज (/) पर रीडायरेक्ट किया जाता है।
    }
  })
}

//3. Logout Route (logout)//उपयोग: जब इस रूट पर पहुंचते हैं, तो यूज़र को लॉगआउट कर दिया जाता है और उसे होम पेज पर भेजा जाता है।

module.exports.logout = (req, res) => {
  res.clearCookie('adminData') //यूज़र को लॉगआउट करना। यह adminData कूकी को क्लियर करता है।
  res.redirect('/')
}

//4. Dashboard Route (dashBoard) //यह सुनिश्चित करता है कि केवल लॉगिन किए हुए एडमिन ही डैशबोर्ड देख सकें।

module.exports.dashBoard = (req, res) => {
  req.cookies.adminData ? res.render('dashBoard') : res.redirect('/')
  //उद्देश्य: यह रूट चेक करता है कि adminData कूकी मौजूद है या नहीं। अगर कूकी पाई जाती है, तो डैशबोर्ड पेज (dashBoard) रेंडर होता है, अन्यथा यूज़र को लॉगिन पेज (/) पर रीडायरेक्ट किया जाता है।
}

//5. Admin Form Route (adminForm) //उपयोग: नए एडमिन के डेटा को जोड़ने के लिए फॉर्म रेंडर करने के लिए।

module.exports.adminForm = (req, res) => {
  res.render('adminForm') //उद्देश्य: यह adminForm पेज को रेंडर करता है। यह पेज एडमिन के लिए एक फॉर्म हो सकता है, जहाँ वे नए एडमिन का डेटा भर सकते हैं।
}

//6. Admin Table Route (adminTable) //उपयोग: यह रूट एडमिन्स की पूरी सूची दिखाता है और एडमिन को एडिट या डिलीट करने के विकल्प देता है।

module.exports.adminTable = async (req, res) => {
  await model.find({}).then(admins => {
    res.render('adminTable', { admins }) //उद्देश्य: सभी एडमिन्स को डेटाबेस से लाकर adminTable पेज पर रेंडर करना। यहां एडमिन्स की सूची दिखाई जाएगी।
  })
}

//7. Add New Admin (addAdmin) //उद्देश्य: यह फंक्शन नए एडमिन को डेटाबेस में जोड़ता है।

module.exports.addAdmin = async (req, res) => {
  req.body.image = req.file.path //पहले इमेज का पथ (path) req.file.path में रखा जाता है।
  console.log(req.body)
  await model.create(req.body).then(() => {
    //फिर model.create() का उपयोग करके डेटाबेस में नया एडमिन बनाया जाता है।
    res.redirect('/adminTable') //नया एडमिन जोड़ने के बाद, उसे adminTable पेज पर रीडायरेक्ट किया जाता है।
  })
}

//Delete Admin (adminDelete) //उद्देश्य: यह फंक्शन किसी एडमिन को डेटाबेस से डिलीट करता है।

module.exports.adminDelete = async (req, res) => {
  const admin = await model.findById(req.params.id)
  fs.unlinkSync(admin.image) //पहले, एडमिन की इमेज को fs.unlinkSync() से डिलीट किया जाता है।

  await model.findByIdAndDelete(req.params.id).then(() => {
    //फिर, findByIdAndDelete() का उपयोग करके उस एडमिन को डेटाबेस से डिलीट किया जाता है।
    res.redirect('/adminTable') //डिलीट करने के बाद, एडमिन टेबल पेज पर रीडायरेक्ट किया जाता है।
  })
}

//9. Edit Admin (adminEdit) => जब किसी एडमिन का डेटा एडिट करना हो।

module.exports.adminEdit = async (req, res) => {
  const admin = await model.findById(req.params.id) //उद्देश्य: यह फंक्शन एडमिन के डेटा को id द्वारा डेटाबेस से लाता है और उसे adminEdit पेज पर रेंडर करता है, ताकि एडमिन डेटा को एडिट किया जा सके।
  res.render('adminEdit', { admin })
}

//10. Update Admin (adminUpdate) => उद्देश्य: यह फंक्शन किसी एडमिन के डेटा को अपडेट करता है।

module.exports.adminUpdate = async (req, res) => {
  const admin = await model.findById(req.body.id)
  let img

  req.file ? (img = req.file.path) : (img = req.body.image) // अगर नई इमेज अपलोड की गई हो तो उसका पथ
  req.file && fs.unlinkSync(admin.image) //अगर नई इमेज अपलोड की गई हो तो पुरानी इमेज डिलीट करें
  req.body.image = img // नई या मौजूदा इमेज का पथ

  await model.findByIdAndUpdate(req.body.id, req.body).then(() => {
    //फिर findByIdAndUpdate() का उपयोग करके एडमिन का डेटा अपडेट किया जाता है।
    res.redirect('/adminTable') //अपडेट करने के बाद, उसे adminTable पेज पर रीडायरेक्ट किया जाता है।
  })
}
