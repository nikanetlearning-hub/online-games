/* ================================================================
   games/alphabet-game.js — بازی اول: آموزش شکل‌های حروف
   ================================================================ */

const ALPHABET_DB = {
  'ا':{display:'ا / آ',forms:[
    {v:'آ-اول',l:'آ در اول (آب...)'},
    {v:'ا-اول',l:'ا در اول (اتاق...)'},
    {v:'ا-وسط',l:'ا در وسط (باران...)'},
    {v:'ا-آخر',l:'ا در آخر (بابا...)'}
  ],words:{
    'آ-اول':[
      {w:'آسمان',i:0,img:'sky'},{w:'آفتاب',i:0,img:'sun'},{w:'آبادان',i:0},
      {w:'آشکار',i:0},{w:'آرام',i:0},{w:'آبشار',i:0,img:'waterfall'},
      {w:'آشتی',i:0},{w:'آلبالو',i:0,img:'cherry'},{w:'آموزگار',i:0,img:'teacher'},
      {w:'آینه',i:0,img:'mirror'},{w:'آتش',i:0,img:'fire'},{w:'آشپز',i:0,img:'chef'},
      {w:'آباد',i:0},{w:'آزاد',i:0},{w:'آسان',i:0},{w:'آهسته',i:0},
      {w:'آجر',i:0,img:'brick'},{w:'آخر',i:0},{w:'آدم',i:0,img:'person'},{w:'آرزو',i:0}
    ],
    'ا-اول':[
      {w:'اتاق',i:0,img:'room'},{w:'انار',i:0,img:'pomegranate'},{w:'اساس',i:0},
      {w:'ارسال',i:0},{w:'افتخار',i:0},{w:'استکان',i:0},{w:'استاد',i:0,img:'professor'},
      {w:'امسال',i:0},{w:'ایستگاه',i:0,img:'station'},{w:'اشتها',i:0},
      {w:'الماس',i:0,img:'diamond'},{w:'اکبر',i:0},{w:'امیر',i:0},
      {w:'افسانه',i:0},{w:'انگور',i:0,img:'grape'},{w:'امروز',i:0},
      {w:'ایران',i:0,img:'iran'},{w:'ادب',i:0},{w:'ارمغان',i:0},{w:'اسب',i:0,img:'horse'}
    ],
    'ا-وسط':[
      {w:'باران',i:1,img:'rain'},{w:'بادام',i:1,img:'almond'},{w:'کاروان',i:1,img:'caravan'},
      {w:'بازار',i:1,img:'market'},{w:'شکار',i:2},{w:'بهار',i:2,img:'spring'},
      {w:'مادر',i:1,img:'mother'},{w:'نگار',i:2},{w:'ماهور',i:1},{w:'قمار',i:2},
      {w:'کبوتر',i:2,img:'pigeon'},{w:'نماز',i:2},{w:'سارا',i:1},{w:'تارا',i:1},
      {w:'آزاد',i:1},{w:'کار',i:1},{w:'دارو',i:1,img:'medicine'},{w:'دکان',i:1,img:'shop'},
      {w:'سماور',i:2,img:'samovar'}
    ],
    'ا-آخر':[
      {w:'بابا',i:3,img:'father'},{w:'دانا',i:3},{w:'دریا',i:3,img:'sea'},
      {w:'زیبا',i:3,img:'beautiful'},{w:'صدا',i:2,img:'sound'},{w:'خدا',i:2},
      {w:'تنها',i:3},{w:'آشنا',i:3},{w:'دنیا',i:3,img:'world'},{w:'نما',i:2},
      {w:'روا',i:2},{w:'شکلا',i:3},{w:'امضا',i:3,img:'signature'},{w:'فرما',i:3},{w:'گدا',i:2}
    ]
  }},
  'ب':{display:'ب',forms:[
    {v:'اول',l:'ب اول (بـ)'},{v:'وسط',l:'ب وسط (ـبـ)'},{v:'آخر',l:'ب آخر (ـب)'}
  ],words:{
    'اول':[
      {w:'باران',i:0,img:'rain'},{w:'باغ',i:0,img:'garden'},{w:'بازار',i:0,img:'market'},
      {w:'بچه',i:0,img:'child'},{w:'برادر',i:0,img:'brother'},{w:'بستنی',i:0,img:'icecream'},
      {w:'بلبل',i:0,img:'nightingale'},{w:'بهار',i:0,img:'spring'},
      {w:'بادام',i:0,img:'almond'},{w:'بابا',i:0,img:'father'},
      {w:'برف',i:0,img:'snow'},{w:'بینی',i:0,img:'nose'},
      {w:'بیابان',i:0,img:'desert'},{w:'بهانه',i:0},{w:'بخار',i:0},
      {w:'برنج',i:0,img:'rice'},{w:'بزرگ',i:0},{w:'بیمار',i:0,img:'sick'},
      {w:'بیست',i:0},{w:'بازی',i:0,img:'game'}
    ],
    'وسط':[
      {w:'آبادی',i:1},{w:'کبوتر',i:1,img:'pigeon'},{w:'ببر',i:1,img:'tiger'},
      {w:'آبی',i:1,img:'blue'},{w:'دربار',i:2},{w:'سبد',i:1,img:'basket'},
      {w:'صبور',i:1},{w:'آبشار',i:1,img:'waterfall'},{w:'لباس',i:1,img:'clothes'},
      {w:'کباب',i:1,img:'kebab'},{w:'خبر',i:1},{w:'شبانه',i:1},
      {w:'بابونه',i:1,img:'daisy'},{w:'سبزه',i:1},{w:'درباره',i:2}
    ],
    'آخر':[
      {w:'کتاب',i:3,img:'book'},{w:'آب',i:1,img:'water'},{w:'شب',i:1,img:'night'},
      {w:'قلب',i:3,img:'heart'},{w:'اسب',i:2,img:'horse'},{w:'کباب',i:3,img:'kebab'},
      {w:'غروب',i:3,img:'sunset'},{w:'مطلب',i:3},{w:'طلب',i:2},{w:'ادب',i:2},
      {w:'لب',i:1},{w:'باب',i:2},{w:'خوب',i:3},{w:'چوب',i:3,img:'wood'}
    ]
  }},
  'پ':{display:'پ',forms:[
    {v:'اول',l:'پ اول (پـ)'},{v:'وسط',l:'پ وسط (ـپـ)'},{v:'آخر',l:'پ آخر (ـپ)'}
  ],words:{
    'اول':[
      {w:'پروانه',i:0,img:'butterfly'},{w:'پدر',i:0,img:'father'},
      {w:'پنجره',i:0,img:'window'},{w:'پسته',i:0,img:'pistachio'},
      {w:'پاییز',i:0,img:'autumn'},{w:'پرنده',i:0,img:'bird'},
      {w:'پنیر',i:0,img:'cheese'},{w:'پول',i:0,img:'money'},
      {w:'پسر',i:0,img:'boy'},{w:'پل',i:0,img:'bridge'},
      {w:'پتو',i:0,img:'blanket'},{w:'پاکت',i:0,img:'envelope'},
      {w:'پزشک',i:0,img:'doctor'},{w:'پلیس',i:0,img:'police'},
      {w:'پارک',i:0,img:'park'},{w:'پرچم',i:0,img:'flag'},
      {w:'پاستیل',i:0,img:'candy'},{w:'پیام',i:0,img:'message'},
      {w:'پرواز',i:0,img:'flight'},{w:'پنج',i:0},
      {w:'پنجشنبه',i:0},{w:'پیراهن',i:0,img:'shirt'},{w:'پشه',i:0,img:'mosquito'}
    ],
    'وسط':[
      {w:'سپید',i:1,img:'white'},{w:'سپر',i:1},{w:'کپک',i:1},{w:'لپه',i:1,img:'lentil'},
      {w:'سپاس',i:1},{w:'تپش',i:1},{w:'تپه',i:1,img:'hill'},
      {w:'سپیده',i:1},{w:'دامپزشک',i:2,img:'vet'},{w:'نپرس',i:1},
      {w:'بپر',i:1},{w:'بپز',i:1},{w:'بپوش',i:1},{w:'بپیچ',i:1},
      {w:'بپاش',i:1},{w:'آشپز',i:2,img:'chef'},{w:'سپاه',i:1},{w:'تپانچه',i:0,img:'gun'}
    ],
    'آخر':[
      {w:'توپ',i:2,img:'ball'},{w:'تیپ',i:2},{w:'لپ',i:1},{w:'زیپ',i:2},
      {w:'لامپ',i:3,img:'lamp'},{w:'تیوپ',i:3,img:'tube'},{w:'چاپ',i:2},
      {w:'چپ',i:1},{w:'تاپ',i:2},{w:'سرتیپ',i:4},{w:'جیپ',i:2,img:'jeep'},
      {w:'سوپ',i:2,img:'soup'},{w:'کلیپ',i:3},{w:'کچاپ',i:3,img:'ketchup'},
      {w:'میکاپ',i:4},{w:'فتوشاپ',i:5,img:'photoshop'}
    ]
  }},
  'ت':{display:'ت',forms:[
    {v:'اول',l:'ت اول (تـ)'},{v:'وسط',l:'ت وسط (ـتـ)'},{v:'آخر',l:'ت آخر (ـت)'}
  ],words:{
    'اول':[
      {w:'تابستان',i:0,img:'summer'},{w:'توت',i:0,img:'berry'},
      {w:'تبریز',i:0,img:'tabriz'},{w:'تخم',i:0,img:'egg'},
      {w:'تپه',i:0,img:'hill'},{w:'تهران',i:0,img:'tehran'},
      {w:'ترب',i:0,img:'radish'},{w:'تاج',i:0,img:'crown'},
      {w:'تاریخ',i:0},{w:'تندرست',i:0},{w:'تپش',i:0},
      {w:'توله',i:0,img:'puppy'},{w:'تنور',i:0,img:'oven'},
      {w:'تگرگ',i:0,img:'hail'},{w:'تیشه',i:0},{w:'تماشا',i:0},{w:'تلاش',i:0}
    ],
    'وسط':[
      {w:'کتاب',i:1,img:'book'},{w:'ستاره',i:1,img:'star'},
      {w:'آتش',i:1,img:'fire'},{w:'متن',i:1},{w:'بستنی',i:1,img:'icecream'},
      {w:'پسته',i:1,img:'pistachio'},{w:'دستمال',i:1,img:'tissue'},
      {w:'گلستان',i:2},{w:'آفتاب',i:1,img:'sun'},{w:'پتو',i:1,img:'blanket'},
      {w:'بستن',i:1},{w:'دستان',i:1}
    ],
    'آخر':[
      {w:'دست',i:3,img:'hand'},{w:'توت',i:2,img:'berry'},{w:'هست',i:3},
      {w:'گشت',i:3},{w:'پست',i:3},{w:'رست',i:3},{w:'خست',i:3},{w:'بست',i:3},
      {w:'گرفت',i:4},{w:'رفت',i:3},{w:'دوست',i:3,img:'friend'},{w:'درست',i:3}
    ]
  }},
  'ث':{display:'ث',forms:[
    {v:'اول',l:'ث اول (ثـ)'},{v:'وسط',l:'ث وسط (ـثـ)'},{v:'آخر',l:'ث آخر (ـث)'}
  ],words:{
    'اول':[{w:'ثبت',i:0},{w:'ثمر',i:0,img:'fruit'},{w:'ثریا',i:0},{w:'ثابت',i:0},{w:'ثروت',i:0,img:'wealth'}],
    'وسط':[{w:'مثلث',i:2,img:'triangle'},{w:'اثر',i:0},{w:'کثرت',i:1},{w:'مثال',i:1},{w:'حدیث',i:2}],
    'آخر':[{w:'مثلث',i:4,img:'triangle'},{w:'اثاث',i:3},{w:'حدوث',i:3},{w:'بعث',i:2},{w:'ورث',i:2}]
  }},
  'ج':{display:'ج',forms:[
    {v:'اول',l:'ج اول (جـ)'},{v:'وسط',l:'ج وسط (ـجـ)'},{v:'آخر',l:'ج آخر (ـج)'}
  ],words:{
    'اول':[
      {w:'جوجه',i:0,img:'chick'},{w:'جنگل',i:0,img:'forest'},
      {w:'جاده',i:0,img:'road'},{w:'جشن',i:0,img:'party'},
      {w:'جدول',i:0,img:'table'},{w:'جواب',i:0,img:'answer'},
      {w:'جمعه',i:0},{w:'جوان',i:0,img:'young'},
      {w:'جزیره',i:0,img:'island'},{w:'جالب',i:0},
      {w:'جرات',i:0},{w:'جعبه',i:0,img:'box'},{w:'جگر',i:0},{w:'جیب',i:0,img:'pocket'}
    ],
    'وسط':[
      {w:'مسجد',i:2,img:'mosque'},{w:'نجات',i:1},{w:'آجیل',i:1,img:'nuts'},
      {w:'حجاب',i:1},{w:'عجله',i:1,img:'hurry'},{w:'مجلس',i:1},
      {w:'نجوا',i:1},{w:'رجب',i:1},{w:'سجده',i:1},{w:'تجربه',i:1}
    ],
    'آخر':[
      {w:'تاج',i:2,img:'crown'},{w:'کج',i:1},{w:'رواج',i:3},{w:'خراج',i:3},
      {w:'موج',i:2,img:'wave'},{w:'برج',i:2,img:'tower'},{w:'ارج',i:2},{w:'علاج',i:3}
    ]
  }},
  'چ':{display:'چ',forms:[
    {v:'اول',l:'چ اول (چـ)'},{v:'وسط',l:'چ وسط (ـچـ)'},{v:'آخر',l:'چ آخر (ـچ)'}
  ],words:{
    'اول':[
      {w:'چتر',i:0,img:'umbrella'},{w:'چوب',i:0,img:'wood'},{w:'چای',i:0,img:'tea'},
      {w:'چراغ',i:0,img:'lamp'},{w:'چکمه',i:0,img:'boots'},{w:'چهار',i:0,img:'four'},
      {w:'چمن',i:0,img:'grass'},{w:'چشم',i:0,img:'eye'},{w:'چاقو',i:0,img:'knife'},
      {w:'چپ',i:0},{w:'چادر',i:0,img:'tent'},{w:'چرم',i:0,img:'leather'}
    ],
    'وسط':[
      {w:'بچه',i:1,img:'child'},{w:'قوچان',i:2},{w:'آچمز',i:1},{w:'کچل',i:1},
      {w:'پچپچه',i:1},{w:'چچل',i:1},{w:'قاچاق',i:2}
    ],
    'آخر':[
      {w:'قارچ',i:3,img:'mushroom'},{w:'گچ',i:1,img:'chalk'},{w:'پوچ',i:2},
      {w:'هیچ',i:2},{w:'قوچ',i:2,img:'ram'}
    ]
  }},
  'ح':{display:'ح',forms:[
    {v:'اول',l:'ح اول (حـ)'},{v:'وسط',l:'ح وسط (ـحـ)'},{v:'آخر',l:'ح آخر (ـح)'}
  ],words:{
    'اول':[
      {w:'حوله',i:0,img:'towel'},{w:'حیاط',i:0,img:'yard'},{w:'حباب',i:0,img:'bubble'},
      {w:'حیوان',i:0,img:'animal'},{w:'حساب',i:0,img:'math'},{w:'حلزون',i:0,img:'snail'},
      {w:'حرف',i:0,img:'letter'},{w:'حیات',i:0},{w:'حمام',i:0,img:'bathroom'},
      {w:'حاضر',i:0}
    ],
    'وسط':[
      {w:'صحرا',i:2,img:'desert'},{w:'محبت',i:1,img:'love'},{w:'سحری',i:1},
      {w:'صحبت',i:1,img:'talk'},{w:'نحوه',i:1},{w:'محال',i:1},{w:'فحش',i:1},{w:'سحر',i:1}
    ],
    'آخر':[
      {w:'مسیح',i:3},{w:'لوح',i:2},{w:'روح',i:2,img:'soul'},{w:'صبح',i:2,img:'morning'},
      {w:'فتح',i:2},{w:'شرح',i:2},{w:'ملح',i:2},{w:'طرح',i:2}
    ]
  }},
  'خ':{display:'خ',forms:[
    {v:'اول',l:'خ اول (خـ)'},{v:'وسط',l:'خ وسط (ـخـ)'},{v:'آخر',l:'خ آخر (ـخ)'}
  ],words:{
    'اول':[
      {w:'خانه',i:0,img:'house'},{w:'خورشید',i:0,img:'sun'},{w:'خواب',i:0,img:'sleep'},
      {w:'خواهر',i:0,img:'sister'},{w:'خاک',i:0,img:'soil'},{w:'خیار',i:0,img:'cucumber'},
      {w:'خبر',i:0,img:'news'},{w:'خرس',i:0,img:'bear'},{w:'خنده',i:0,img:'laugh'},
      {w:'خدمت',i:0},{w:'خوب',i:0,img:'good'},{w:'خدا',i:0,img:'god'}
    ],
    'وسط':[
      {w:'بخار',i:1,img:'steam'},{w:'دختر',i:1,img:'girl'},{w:'نخود',i:1,img:'chickpea'},
      {w:'مخمل',i:1,img:'velvet'},{w:'شکرخا',i:3},{w:'نخاله',i:1},
      {w:'بخت',i:1,img:'luck'},{w:'مختار',i:1}
    ],
    'آخر':[
      {w:'میخ',i:2,img:'nail'},{w:'کاخ',i:2,img:'palace'},{w:'شاخ',i:2,img:'horn'},
      {w:'رخ',i:1},{w:'سخ',i:1},{w:'فرخ',i:3},{w:'شوخ',i:3}
    ]
  }},
  'د':{display:'د',forms:[
    {v:'اول',l:'د اول'},{v:'وسط',l:'د وسط'},{v:'آخر',l:'د آخر'}
  ],words:{
    'اول':[
      {w:'دریا',i:0,img:'sea'},{w:'دانه',i:0,img:'seed'},{w:'دست',i:0,img:'hand'},
      {w:'دوست',i:0,img:'friend'},{w:'دنیا',i:0,img:'world'},{w:'دانا',i:0},
      {w:'درخت',i:0,img:'tree'},{w:'دوا',i:0,img:'medicine'},{w:'دقیقه',i:0,img:'minute'},
      {w:'دلیر',i:0,img:'brave'},{w:'درس',i:0,img:'lesson'},{w:'دندان',i:0,img:'tooth'},
      {w:'دریچه',i:0},{w:'دبستان',i:0,img:'school'}
    ],
    'وسط':[
      {w:'مداد',i:1,img:'pencil'},{w:'پدر',i:1,img:'father'},{w:'بردن',i:1},
      {w:'سردار',i:1},{w:'بیدار',i:1,img:'awake'},{w:'قدرت',i:1,img:'power'},
      {w:'جدول',i:1,img:'table'},{w:'آدم',i:1,img:'person'},{w:'بدن',i:1,img:'body'}
    ],
    'آخر':[
      {w:'سرد',i:3,img:'cold'},{w:'کودک',i:3,img:'child'},{w:'بند',i:3},
      {w:'درد',i:3,img:'pain'},{w:'مرد',i:3,img:'man'},{w:'رود',i:2,img:'river'},
      {w:'زرد',i:3,img:'yellow'},{w:'بید',i:2,img:'willow'},{w:'دود',i:2,img:'smoke'},
      {w:'سود',i:3}
    ]
  }},
  'ذ':{display:'ذ',forms:[
    {v:'اول',l:'ذ اول'},{v:'وسط',l:'ذ وسط'},{v:'آخر',l:'ذ آخر'}
  ],words:{
    'اول':[{w:'ذرت',i:0,img:'corn'},{w:'ذوق',i:0},{w:'ذره',i:0},{w:'ذهن',i:0,img:'mind'},{w:'ذخیره',i:0}],
    'وسط':[{w:'گذر',i:1},{w:'گذرنامه',i:1,img:'passport'},{w:'بذر',i:1,img:'seed'},{w:'مذاب',i:1}],
    'آخر':[{w:'لذیذ',i:4,img:'delicious'},{w:'نفوذ',i:3},{w:'خذ',i:1},{w:'مذ',i:1}]
  }},
  'ر':{display:'ر',forms:[
    {v:'اول',l:'ر اول'},{v:'وسط',l:'ر وسط'},{v:'آخر',l:'ر آخر'}
  ],words:{
    'اول':[
      {w:'روباه',i:0,img:'fox'},{w:'رنگ',i:0,img:'color'},{w:'رودخانه',i:0,img:'river'},
      {w:'رازی',i:0},{w:'روز',i:0,img:'day'},{w:'ریاضی',i:0,img:'math'},
      {w:'راه',i:0,img:'road'},{w:'راز',i:0,img:'secret'},{w:'رستم',i:0},
      {w:'رقص',i:0,img:'dance'},{w:'رگ',i:0,img:'vein'},{w:'رهبر',i:0,img:'leader'}
    ],
    'وسط':[
      {w:'کره',i:2,img:'butter'},{w:'باران',i:2,img:'rain'},{w:'برف',i:1,img:'snow'},
      {w:'ترب',i:1,img:'radish'},{w:'پروانه',i:2,img:'butterfly'},{w:'دریا',i:2,img:'sea'},
      {w:'مریم',i:2},{w:'تارا',i:2}
    ],
    'آخر':[
      {w:'شیر',i:2,img:'lion'},{w:'مار',i:2,img:'snake'},{w:'مادر',i:4,img:'mother'},
      {w:'ابر',i:2,img:'cloud'},{w:'پدر',i:2,img:'father'},{w:'خر',i:1,img:'donkey'},
      {w:'سر',i:1,img:'head'},{w:'دور',i:2},{w:'پار',i:2},{w:'بور',i:2}
    ]
  }},
  'ز':{display:'ز',forms:[
    {v:'اول',l:'ز اول'},{v:'وسط',l:'ز وسط'},{v:'آخر',l:'ز آخر'}
  ],words:{
    'اول':[
      {w:'زنبور',i:0,img:'bee'},{w:'زبان',i:0,img:'tongue'},{w:'زمین',i:0,img:'earth'},
      {w:'زرد',i:0,img:'yellow'},{w:'زالو',i:0,img:'leech'},{w:'زیتون',i:0,img:'olive'},
      {w:'زیبا',i:0,img:'beautiful'},{w:'زحمت',i:0},{w:'زرافه',i:0,img:'giraffe'},
      {w:'زنگ',i:0,img:'bell'}
    ],
    'وسط':[
      {w:'آویزان',i:2,img:'hanging'},{w:'میزان',i:1},{w:'گزارش',i:1,img:'report'},
      {w:'بزرگ',i:1,img:'big'},{w:'میز',i:1,img:'table'},{w:'نیزار',i:1},{w:'گزیر',i:1}
    ],
    'آخر':[
      {w:'آواز',i:3,img:'song'},{w:'نماز',i:3,img:'prayer'},{w:'باز',i:2,img:'open'},
      {w:'گز',i:1},{w:'ساز',i:2,img:'instrument'},{w:'راز',i:2,img:'secret'},
      {w:'ناز',i:2},{w:'پرواز',i:4,img:'flight'}
    ]
  }},
  'ژ':{display:'ژ',forms:[
    {v:'اول',l:'ژ اول'},{v:'وسط',l:'ژ وسط'},{v:'آخر',l:'ژ آخر'}
  ],words:{
    'اول':[{w:'ژاله',i:0},{w:'ژرف',i:0},{w:'ژاپن',i:0,img:'japan'},{w:'ژولیده',i:0}],
    'وسط':[{w:'ویژه',i:2},{w:'موژان',i:2},{w:'پژمان',i:1},{w:'ژوژان',i:1}],
    'آخر':[{w:'لژ',i:1},{w:'دژ',i:1},{w:'پژ',i:1},{w:'اژ',i:1}]
  }},
  'س':{display:'س',forms:[
    {v:'اول',l:'س اول (سـ)'},{v:'وسط',l:'س وسط (ـسـ)'},{v:'آخر',l:'س آخر (ـس)'}
  ],words:{
    'اول':[
      {w:'سیب',i:0,img:'apple'},{w:'ستاره',i:0,img:'star'},{w:'سفید',i:0,img:'white'},
      {w:'سلام',i:0,img:'hello'},{w:'ساعت',i:0,img:'clock'},{w:'سلامتی',i:0},
      {w:'سرما',i:0,img:'cold'},{w:'سفر',i:0,img:'travel'},{w:'ساده',i:0,img:'simple'},
      {w:'سخن',i:0,img:'speech'},{w:'سرباز',i:0,img:'soldier'},{w:'سماور',i:0,img:'samovar'},
      {w:'سیاه',i:0,img:'black'},{w:'سنگر',i:0}
    ],
    'وسط':[
      {w:'افسر',i:2,img:'officer'},{w:'مسیر',i:1,img:'path'},{w:'آسمان',i:1,img:'sky'},
      {w:'پسته',i:1,img:'pistachio'},{w:'دستمال',i:1,img:'tissue'},{w:'مسجد',i:1,img:'mosque'},
      {w:'آسان',i:1,img:'easy'},{w:'پسر',i:1,img:'boy'},{w:'دوست',i:1,img:'friend'},
      {w:'رستم',i:1}
    ],
    'آخر':[
      {w:'عروس',i:3,img:'bride'},{w:'داس',i:2,img:'scythe'},{w:'مس',i:1,img:'copper'},
      {w:'کیس',i:2},{w:'لیس',i:2},{w:'پاس',i:2},{w:'راس',i:2},{w:'کاس',i:2}
    ]
  }},
  'ش':{display:'ش',forms:[
    {v:'اول',l:'ش اول (شـ)'},{v:'وسط',l:'ش وسط (ـشـ)'},{v:'آخر',l:'ش آخر (ـش)'}
  ],words:{
    'اول':[
      {w:'شهر',i:0,img:'city'},{w:'شیر',i:0,img:'lion'},{w:'شادی',i:0,img:'happiness'},
      {w:'شکار',i:0,img:'hunt'},{w:'شمع',i:0,img:'candle'},{w:'شکر',i:0,img:'sugar'},
      {w:'شاهکار',i:0},{w:'شب',i:0,img:'night'},{w:'شنا',i:0,img:'swimming'},
      {w:'شلوغ',i:0,img:'crowded'},{w:'شاگرد',i:0,img:'student'},{w:'شعر',i:0,img:'poem'},
      {w:'شیشه',i:0,img:'glass'},{w:'شکارچی',i:0,img:'hunter'}
    ],
    'وسط':[
      {w:'کشتی',i:1,img:'ship'},{w:'آشتی',i:1,img:'reconciliation'},{w:'گوشت',i:2,img:'meat'},
      {w:'پشمالو',i:1},{w:'دانشمند',i:3,img:'scientist'},{w:'کوشش',i:1},
      {w:'آشکار',i:1},{w:'پشه',i:1,img:'mosquito'},{w:'کشور',i:1,img:'country'},
      {w:'شیشه',i:2,img:'glass'}
    ],
    'آخر':[
      {w:'موش',i:2,img:'mouse'},{w:'آش',i:1,img:'soup'},{w:'کش',i:1},{w:'ریش',i:2,img:'beard'},
      {w:'بیش',i:2},{w:'پیش',i:2},{w:'دش',i:1},{w:'گوش',i:2,img:'ear'}
    ]
  }},
  'ص':{display:'ص',forms:[
    {v:'اول',l:'ص اول (صـ)'},{v:'وسط',l:'ص وسط (ـصـ)'},{v:'آخر',l:'ص آخر (ـص)'}
  ],words:{
    'اول':[
      {w:'صدف',i:0,img:'shell'},{w:'صبح',i:0,img:'morning'},{w:'صابون',i:0,img:'soap'},
      {w:'صندلی',i:0,img:'chair'},{w:'صداقت',i:0},{w:'صورت',i:0,img:'face'},
      {w:'صدا',i:0,img:'sound'},{w:'صلح',i:0,img:'peace'},{w:'صبحانه',i:0,img:'breakfast'},
      {w:'صنعت',i:0,img:'industry'}
    ],
    'وسط':[
      {w:'فصل',i:2,img:'season'},{w:'عصر',i:1,img:'afternoon'},{w:'نصیب',i:1},
      {w:'قصه',i:1,img:'story'},{w:'بصیر',i:1},{w:'مصیبت',i:1},{w:'عصا',i:1,img:'cane'}
    ],
    'آخر':[
      {w:'خالص',i:3,img:'pure'},{w:'قرص',i:3,img:'pill'},{w:'شخص',i:2,img:'person'},
      {w:'مخلص',i:3},{w:'رص',i:1},{w:'قص',i:1},{w:'عص',i:1}
    ]
  }},
  'ض':{display:'ض',forms:[
    {v:'اول',l:'ض اول (ضـ)'},{v:'وسط',l:'ض وسط (ـضـ)'},{v:'آخر',l:'ض آخر (ـض)'}
  ],words:{
    'اول':[{w:'ضرب',i:0,img:'multiply'},{w:'ضامن',i:0},{w:'ضمیر',i:0},{w:'ضخامت',i:0},{w:'ضربه',i:0,img:'hit'}],
    'وسط':[{w:'عضله',i:2,img:'muscle'},{w:'مضرب',i:1},{w:'بعضی',i:2},{w:'مضطرب',i:1},{w:'مضمون',i:1}],
    'آخر':[{w:'مریض',i:3,img:'sick'},{w:'حوض',i:2,img:'pool'},{w:'عرض',i:2,img:'width'},{w:'قرض',i:2,img:'loan'},{w:'بعض',i:2}]
  }},
  'ط':{display:'ط',forms:[
    {v:'اول',l:'ط اول'},{v:'وسط',l:'ط وسط'},{v:'آخر',l:'ط آخر'}
  ],words:{
    'اول':[
      {w:'طبل',i:0,img:'drum'},{w:'طوطی',i:0,img:'parrot'},{w:'طلا',i:0,img:'gold'},
      {w:'طوفان',i:0,img:'storm'},{w:'طاقچه',i:0},{w:'طبیب',i:0,img:'doctor'},
      {w:'طلاق',i:0},{w:'طناب',i:0,img:'rope'}
    ],
    'وسط':[
      {w:'مطلب',i:2},{w:'وطن',i:1,img:'homeland'},{w:'بطر',i:1},{w:'مطرح',i:2},
      {w:'قطار',i:1,img:'train'},{w:'بطان',i:1}
    ],
    'آخر':[
      {w:'خط',i:1,img:'line'},{w:'حیاط',i:3,img:'yard'},{w:'بساط',i:3},{w:'فراط',i:3},
      {w:'غلط',i:2,img:'wrong'},{w:'شرط',i:2,img:'condition'},{w:'قرط',i:2}
    ]
  }},
  'ظ':{display:'ظ',forms:[
    {v:'اول',l:'ظ اول'},{v:'وسط',l:'ظ وسط'},{v:'آخر',l:'ظ آخر'}
  ],words:{
    'اول':[{w:'ظرف',i:0,img:'dish'},{w:'ظهر',i:0,img:'noon'},{w:'ظالم',i:0},{w:'ظریف',i:0},{w:'ظهور',i:0}],
    'وسط':[{w:'عظیم',i:2,img:'great'},{w:'نظیر',i:1},{w:'ملظف',i:2},{w:'منظم',i:1,img:'organized'},{w:'نظافت',i:1,img:'cleanliness'}],
    'آخر':[{w:'حافظ',i:3,img:'hafez'},{w:'حفاظ',i:3},{w:'لحاظ',i:3},{w:'غلاظ',i:3},{w:'ملظ',i:2}]
  }},
  'ع':{display:'ع',forms:[
    {v:'اول',l:'ع اول (عـ)'},{v:'وسط',l:'ع وسط (ـعـ)'},{v:'آخر',l:'ع آخر (ـع)'}
  ],words:{
    'اول':[
      {w:'عینک',i:0,img:'glasses'},{w:'عروس',i:0,img:'bride'},{w:'عسل',i:0,img:'honey'},
      {w:'عکس',i:0,img:'photo'},{w:'عقاب',i:0,img:'eagle'},{w:'عطر',i:0,img:'perfume'},
      {w:'علم',i:0,img:'science'},{w:'عشق',i:0,img:'love'},{w:'عید',i:0,img:'eid'},
      {w:'عجیب',i:0,img:'strange'}
    ],
    'وسط':[
      {w:'جعبه',i:1,img:'box'},{w:'معلم',i:1,img:'teacher'},{w:'سعادت',i:1},
      {w:'طعم',i:1,img:'taste'},{w:'معرفت',i:1},{w:'بعید',i:1},{w:'شعر',i:1,img:'poem'}
    ],
    'آخر':[
      {w:'شمع',i:2,img:'candle'},{w:'شجاع',i:3,img:'brave'},{w:'متاع',i:3},
      {w:'باع',i:2},{w:'منع',i:2},{w:'رفع',i:2},{w:'جمع',i:2,img:'sum'}
    ]
  }},
  'غ':{display:'غ',forms:[
    {v:'اول',l:'غ اول (غـ)'},{v:'وسط',l:'غ وسط (ـغـ)'},{v:'آخر',l:'غ آخر (ـغ)'}
  ],words:{
    'اول':[
      {w:'غار',i:0,img:'cave'},{w:'غاز',i:0,img:'goose'},{w:'غذا',i:0,img:'food'},
      {w:'غروب',i:0,img:'sunset'},{w:'غواص',i:0,img:'diver'},{w:'غنی',i:0},
      {w:'غمگین',i:0,img:'sad'},{w:'غبار',i:0,img:'dust'}
    ],
    'وسط':[
      {w:'لغت',i:1,img:'word'},{w:'باغچه',i:1,img:'garden'},{w:'مغز',i:1,img:'brain'},
      {w:'شغل',i:1,img:'job'},{w:'دغدغه',i:1},{w:'مغازه',i:1,img:'shop'},
      {w:'باغبان',i:1,img:'gardener'}
    ],
    'آخر':[
      {w:'تیغ',i:2,img:'blade'},{w:'باغ',i:2,img:'garden'},{w:'داغ',i:2},
      {w:'فراغ',i:3},{w:'بلاغ',i:3},{w:'صیغ',i:2},{w:'مغ',i:1}
    ]
  }},
  'ف':{display:'ف',forms:[
    {v:'اول',l:'ف اول (فـ)'},{v:'وسط',l:'ف وسط (ـفـ)'},{v:'آخر',l:'ف آخر (ـف)'}
  ],words:{
    'اول':[
      {w:'فکر',i:0,img:'thought'},{w:'فصل',i:0,img:'season'},{w:'فیل',i:0,img:'elephant'},
      {w:'فرش',i:0,img:'carpet'},{w:'فنجان',i:0,img:'cup'},{w:'فردا',i:0,img:'tomorrow'},
      {w:'فدا',i:0},{w:'فهم',i:0,img:'understanding'},{w:'فرزند',i:0,img:'child'},
      {w:'فضا',i:0,img:'space'}
    ],
    'وسط':[
      {w:'کلافه',i:2},{w:'آفتاب',i:1,img:'sun'},{w:'دفتر',i:1,img:'notebook'},
      {w:'سفر',i:1,img:'travel'},{w:'آفرین',i:1},{w:'نفهم',i:1},
      {w:'کفش',i:1,img:'shoe'},{w:'آفرینش',i:1}
    ],
    'آخر':[
      {w:'لیف',i:2,img:'sponge'},{w:'لاف',i:2},{w:'کیف',i:2,img:'bag'},
      {w:'صاف',i:2,img:'smooth'},{w:'خف',i:1},{w:'عف',i:1},{w:'صوف',i:2}
    ]
  }},
  'ق':{display:'ق',forms:[
    {v:'اول',l:'ق اول (قـ)'},{v:'وسط',l:'ق وسط (ـقـ)'},{v:'آخر',l:'ق آخر (ـق)'}
  ],words:{
    'اول':[
      {w:'قند',i:0,img:'sugar'},{w:'قاشق',i:0,img:'spoon'},{w:'قورباغه',i:0,img:'frog'},
      {w:'قشنگ',i:0,img:'beautiful'},{w:'قلم',i:0,img:'pen'},{w:'قمری',i:0},
      {w:'قدرت',i:0,img:'power'},{w:'قصه',i:0,img:'story'},{w:'قهرمان',i:0,img:'hero'},
      {w:'قنداق',i:0}
    ],
    'وسط':[
      {w:'نقاشی',i:1,img:'painting'},{w:'شقیقه',i:1},{w:'آقای',i:1,img:'mister'},
      {w:'نقطه',i:1,img:'dot'},{w:'دقیقه',i:1,img:'minute'},{w:'بقیه',i:1},
      {w:'نقشه',i:1,img:'map'}
    ],
    'آخر':[
      {w:'اجاق',i:3,img:'stove'},{w:'اتاق',i:3,img:'room'},{w:'برق',i:2,img:'electricity'},
      {w:'خلق',i:2},{w:'دوق',i:2},{w:'حق',i:1,img:'right'},{w:'دق',i:1}
    ]
  }},
  'ک':{display:'ک',forms:[
    {v:'اول',l:'ک اول (کـ)'},{v:'وسط',l:'ک وسط (ـکـ)'},{v:'آخر',l:'ک آخر (ـک)'}
  ],words:{
    'اول':[
      {w:'کتاب',i:0,img:'book'},{w:'کبوتر',i:0,img:'pigeon'},{w:'کوه',i:0,img:'mountain'},
      {w:'کلاس',i:0,img:'class'},{w:'کفش',i:0,img:'shoe'},{w:'کشور',i:0,img:'country'},
      {w:'کمک',i:0,img:'help'},{w:'کاغذ',i:0,img:'paper'},{w:'کوهستان',i:0,img:'mountains'},
      {w:'کیک',i:0,img:'cake'},{w:'کلید',i:0,img:'key'}
    ],
    'وسط':[
      {w:'شکر',i:1,img:'sugar'},{w:'مکارم',i:1},{w:'پاکار',i:2},{w:'نکته',i:1},
      {w:'بکارت',i:1},{w:'تکیه',i:1},{w:'مکتب',i:1,img:'school'},{w:'سکوت',i:1,img:'silence'}
    ],
    'آخر':[
      {w:'نمک',i:3,img:'salt'},{w:'خاک',i:3,img:'soil'},{w:'کمک',i:3,img:'help'},
      {w:'رنگینک',i:5},{w:'مالک',i:3},{w:'پاک',i:2,img:'clean'},{w:'تک',i:1},{w:'شک',i:1}
    ]
  }},
  'گ':{display:'گ',forms:[
    {v:'اول',l:'گ اول (گـ)'},{v:'وسط',l:'گ وسط (ـگـ)'},{v:'آخر',l:'گ آخر (ـگ)'}
  ],words:{
    'اول':[
      {w:'گوساله',i:0,img:'calf'},{w:'گل',i:0,img:'flower'},{w:'گربه',i:0,img:'cat'},
      {w:'گرگ',i:0,img:'wolf'},{w:'گوش',i:0,img:'ear'},{w:'گندم',i:0,img:'wheat'},
      {w:'گنجشک',i:0,img:'sparrow'},{w:'گفتار',i:0},{w:'گناه',i:0,img:'sin'},
      {w:'گرم',i:0,img:'hot'}
    ],
    'وسط':[
      {w:'انگور',i:2,img:'grape'},{w:'بگشا',i:1},{w:'مگر',i:1},{w:'نگار',i:1},
      {w:'آگهی',i:1,img:'advertisement'},{w:'بگم',i:1},{w:'نگین',i:1,img:'gem'},
      {w:'تگرگ',i:1,img:'hail'}
    ],
    'آخر':[
      {w:'سگ',i:1,img:'dog'},{w:'برگ',i:2,img:'leaf'},{w:'مرگ',i:2,img:'death'},
      {w:'بگ',i:1},{w:'رگ',i:1,img:'vein'},{w:'تگ',i:1},{w:'گنگ',i:2}
    ]
  }},
  'ل':{display:'ل',forms:[
    {v:'اول',l:'ل اول (لـ)'},{v:'وسط',l:'ل وسط (ـلـ)'},{v:'آخر',l:'ل آخر (ـل)'}
  ],words:{
    'اول':[
      {w:'لاله',i:0,img:'tulip'},{w:'لب',i:0,img:'lip'},{w:'لانه',i:0,img:'nest'},
      {w:'لیوان',i:0,img:'glass'},{w:'لواش',i:0,img:'lavash'},{w:'لحاف',i:0,img:'quilt'},
      {w:'لامپ',i:0,img:'lamp'},{w:'لباس',i:0,img:'clothes'},{w:'لذت',i:0,img:'pleasure'},
      {w:'لطف',i:0,img:'kindness'}
    ],
    'وسط':[
      {w:'البرز',i:1,img:'alborz'},{w:'ملخ',i:1,img:'grasshopper'},{w:'کلاس',i:2,img:'class'},
      {w:'بلبل',i:2,img:'nightingale'},{w:'گلابی',i:1,img:'pear'},{w:'مثلث',i:1,img:'triangle'},
      {w:'شلوغ',i:1,img:'crowded'},{w:'سلیقه',i:1,img:'taste'}
    ],
    'آخر':[
      {w:'گل',i:1,img:'flower'},{w:'خال',i:2,img:'mole'},{w:'شال',i:2,img:'shawl'},
      {w:'بال',i:2,img:'wing'},{w:'دل',i:1,img:'heart'},{w:'مل',i:1},
      {w:'قفل',i:3,img:'lock'},{w:'قبل',i:3,img:'before'}
    ]
  }},
  'م':{display:'م',forms:[
    {v:'اول',l:'م اول (مـ)'},{v:'وسط',l:'م وسط (ـمـ)'},{v:'آخر',l:'م آخر (ـم)'}
  ],words:{
    'اول':[
      {w:'مادر',i:0,img:'mother'},{w:'ماهی',i:0,img:'fish'},{w:'مدرسه',i:0,img:'school'},
      {w:'مهر',i:0,img:'kindness'},{w:'میز',i:0,img:'table'},{w:'منزل',i:0,img:'home'},
      {w:'مردم',i:0,img:'people'},{w:'مثل',i:0},{w:'ملخ',i:0,img:'grasshopper'},
      {w:'مقدار',i:0,img:'amount'},{w:'موش',i:0,img:'mouse'},{w:'ماشین',i:0,img:'car'}
    ],
    'وسط':[
      {w:'عمیق',i:1,img:'deep'},{w:'نمک',i:1,img:'salt'},{w:'شمع',i:1,img:'candle'},
      {w:'قمری',i:1},{w:'کمال',i:1,img:'perfection'},{w:'آسمان',i:1,img:'sky'},
      {w:'زمین',i:1,img:'earth'},{w:'کمان',i:1,img:'bow'}
    ],
    'آخر':[
      {w:'نسیم',i:3,img:'breeze'},{w:'خام',i:2,img:'raw'},{w:'شام',i:2,img:'dinner'},
      {w:'بام',i:2,img:'roof'},{w:'دام',i:2,img:'trap'},{w:'غم',i:2,img:'sorrow'},{w:'رم',i:1}
    ]
  }},
  'ن':{display:'ن',forms:[
    {v:'اول',l:'ن اول (نـ)'},{v:'وسط',l:'ن وسط (ـنـ)'},{v:'آخر',l:'ن آخر (ـن)'}
  ],words:{
    'اول':[
      {w:'نان',i:0,img:'bread'},{w:'نمک',i:0,img:'salt'},{w:'نور',i:0,img:'light'},
      {w:'نگار',i:0},{w:'نهال',i:0,img:'sapling'},{w:'نقاشی',i:0,img:'painting'},
      {w:'نام',i:0,img:'name'},{w:'ناز',i:0},{w:'نفس',i:0,img:'breath'},
      {w:'نیمکت',i:0,img:'bench'},{w:'نوک',i:0,img:'tip'},{w:'نبات',i:0,img:'candy'}
    ],
    'وسط':[
      {w:'پنیر',i:1,img:'cheese'},{w:'منزل',i:1,img:'home'},{w:'خونه',i:2,img:'house'},
      {w:'دانا',i:1,img:'wise'},{w:'سنگ',i:1,img:'stone'},{w:'آسمان',i:2,img:'sky'},
      {w:'بهانه',i:2},{w:'سفینه',i:2,img:'spaceship'}
    ],
    'آخر':[
      {w:'من',i:1},{w:'کمان',i:3,img:'bow'},{w:'زبان',i:3,img:'tongue'},
      {w:'آسمان',i:4,img:'sky'},{w:'خوان',i:3},{w:'نان',i:2,img:'bread'},
      {w:'فن',i:1,img:'art'},{w:'بن',i:1}
    ]
  }},
  'و':{display:'و',forms:[
    {v:'اول',l:'و اول'},{v:'وسط',l:'و وسط'},{v:'آخر',l:'و آخر'}
  ],words:{
    'اول':[
      {w:'ورزش',i:0,img:'sport'},{w:'وسط',i:0,img:'middle'},{w:'وقت',i:0,img:'time'},
      {w:'وقتی',i:0},{w:'ولی',i:0},{w:'وزیر',i:0,img:'minister'},
      {w:'وجود',i:0},{w:'وطن',i:0,img:'homeland'}
    ],
    'وسط':[
      {w:'شلوار',i:2,img:'pants'},{w:'نوکر',i:1},{w:'دوران',i:1,img:'era'},
      {w:'کوهستان',i:1,img:'mountains'},{w:'دوست',i:1,img:'friend'},
      {w:'بوفالو',i:2},{w:'پروانه',i:2,img:'butterfly'}
    ],
    'آخر':[
      {w:'جارو',i:3,img:'broom'},{w:'مو',i:1,img:'hair'},{w:'نو',i:1,img:'new'},
      {w:'دو',i:1,img:'two'},{w:'تو',i:1},{w:'او',i:1},{w:'رو',i:1},{w:'سو',i:1}
    ]
  }},
  'ه':{display:'ه',forms:[
    {v:'اول',l:'ه اول (هـ)'},{v:'وسط',l:'ه وسط (ـهـ)'},{v:'آخر',l:'ه آخر (ـه / ه)'}
  ],words:{
    'اول':[
      {w:'هوا',i:0,img:'air'},{w:'هلال',i:0,img:'crescent'},{w:'هفت',i:0,img:'seven'},
      {w:'همسایه',i:0,img:'neighbor'},{w:'هندوانه',i:0,img:'watermelon'},
      {w:'هدف',i:0,img:'target'},{w:'هور',i:0},{w:'هزار',i:0,img:'thousand'}
    ],
    'وسط':[
      {w:'مهر',i:1,img:'kindness'},{w:'شهر',i:1,img:'city'},{w:'بهار',i:1,img:'spring'},
      {w:'چهار',i:1,img:'four'},{w:'دهان',i:1,img:'mouth'},{w:'ماهی',i:1,img:'fish'},
      {w:'شهرزاد',i:1},{w:'کوهستان',i:2,img:'mountains'}
    ],
    'آخر':[
      {w:'خانه',i:3,img:'house'},{w:'ماه',i:2,img:'moon'},{w:'راه',i:2,img:'road'},
      {w:'شبیه',i:3,img:'similar'},{w:'به',i:1,img:'to'},{w:'ده',i:1,img:'ten'},
      {w:'سه',i:2,img:'three'},{w:'گله',i:3,img:'herd'}
    ]
  }},
  'ی':{display:'ی',forms:[
    {v:'اول',l:'ی اول (یـ)'},{v:'وسط',l:'ی وسط (ـیـ)'},{v:'آخر',l:'ی آخر (ـی)'}
  ],words:{
    'اول':[
      {w:'یار',i:0,img:'friend'},{w:'یاس',i:0,img:'jasmine'},{w:'یک',i:0,img:'one'},
      {w:'یخچال',i:0,img:'fridge'},{w:'یلدا',i:0,img:'yalda'},{w:'یاد',i:0,img:'memory'},
      {w:'یکتا',i:0},{w:'یقین',i:0,img:'certainty'}
    ],
    'وسط':[
      {w:'شیر',i:1,img:'lion'},{w:'بینی',i:1,img:'nose'},{w:'سیب',i:1,img:'apple'},
      {w:'پنیر',i:2,img:'cheese'},{w:'سفید',i:2,img:'white'},{w:'میز',i:1,img:'table'},
      {w:'دنیا',i:2,img:'world'},{w:'بیابان',i:1,img:'desert'}
    ],
    'آخر':[
      {w:'روسی',i:3,img:'russian'},{w:'ایرانی',i:5,img:'iranian'},
      {w:'دنیایی',i:5},{w:'خوبی',i:3},{w:'سی',i:1,img:'thirty'},
      {w:'دی',i:1},{w:'می',i:1},{w:'پی',i:1}
    ]
  }}
};

/* ================================================================
   ماژول بازی الفبا
   ================================================================ */
const AlphabetGame = {
    DB: JSON.parse(JSON.stringify(ALPHABET_DB)), // کپی مستقل
    container: null,
    state: { letter: '', form: '', wordData: null, usedWords: [], isLocked: false },
    el: {},

    /* ============================================================
       init
       ============================================================ */
    init(container) {
        this.container = container;
        this.mergeCustomWords();
        this.renderSelector();
    },

    /* ============================================================
       ادغام کلمات سفارشی والدین
       ============================================================ */
    mergeCustomWords() {
        const custom = ParentService.getCustomWords();
        Object.keys(custom).forEach(key => {
            const [letter, form] = key.split('|');
            if (!this.DB[letter]) return;
            if (!this.DB[letter].words[form]) this.DB[letter].words[form] = [];
            custom[key].forEach(item => {
                if (!this.DB[letter].words[form].some(w => w.w === item.w)) {
                    this.DB[letter].words[form].push({ ...item });
                }
            });
        });
    },

    /* ============================================================
       صفحه‌ی انتخاب حرف و شکل
       ============================================================ */
    renderSelector() {
        this.container.innerHTML = `
            <div class="selector">
                <h2>انتخاب حرف و شکل برای آموزش</h2>
                <h3>۱) حرف را انتخاب کنید:</h3>
                <div class="letter-grid" id="ag-letter-grid"></div>
                <h3>۲) شکل حرف را انتخاب کنید:</h3>
                <div class="form-list" id="ag-form-list"></div>
                <button class="start-btn" id="ag-start-btn" disabled>شروع بازی</button>
            </div>
        `;
        this.el.letterGrid = document.getElementById('ag-letter-grid');
        this.el.formList   = document.getElementById('ag-form-list');
        this.el.startBtn   = document.getElementById('ag-start-btn');

        this.buildLetterGrid();
        this.el.startBtn.addEventListener('click', () => this.startGame());
    },

    buildLetterGrid() {
        this.el.letterGrid.innerHTML = '';
        Object.keys(this.DB).forEach(key => {
            const d = document.createElement('div');
            d.className = 'ltr';
            d.textContent = this.DB[key].display;
            d.dataset.key = key;
            d.addEventListener('click', () => this.selectLetter(key));
            this.el.letterGrid.appendChild(d);
        });
    },

    selectLetter(key) {
        this.state.letter = key;
        this.state.form = '';
        this.el.letterGrid.querySelectorAll('.ltr').forEach(el => {
            el.classList.toggle('sel', el.dataset.key === key);
        });
        this.buildFormList(key);
        this.el.startBtn.disabled = true;
    },

    buildFormList(key) {
        this.el.formList.innerHTML = '';
        this.DB[key].forms.forEach(f => {
            const b = document.createElement('button');
            b.textContent = f.l;
            b.dataset.v = f.v;
            b.addEventListener('click', () => {
                this.state.form = f.v;
                this.el.formList.querySelectorAll('button').forEach(x => {
                    x.classList.toggle('sel', x.dataset.v === f.v);
                });
                this.el.startBtn.disabled = false;
            });
            this.el.formList.appendChild(b);
        });
    },

    /* ============================================================
       شروع بازی
       ============================================================ */
   startGame() {
    if (!this.state.letter || !this.state.form) return;
    GameShell.setScore(0);
    GameShell.setGameInfo(this.DB[this.state.letter].display, this.state.form);
    GameShell.enableHint(this.DB[this.state.letter].display);
    GameShell.enableChange('تغییر حرف');   // ← این خط اضافه شود
    this.state.usedWords = [];
    this.state.isLocked = false;
    this.renderGameArea();
    this.showNextWord();
}

    /* ============================================================
       ساخت ناحیه بازی
       ============================================================ */
    renderGameArea() {
        this.container.innerHTML = `
            <div class="game-area" id="ag-game-area">
                <p class="instruction" id="ag-instruction"></p>
                <div class="word" id="ag-word"></div>
                <div class="word-image-container" id="ag-word-img"></div>
                <div class="feedback-panel" id="ag-feedback"></div>
            </div>
            <button class="sound-btn" id="ag-sound-btn" title="پخش صدا">🔊</button>
        `;
        this.el.gameArea    = document.getElementById('ag-game-area');
        this.el.instruction = document.getElementById('ag-instruction');
        this.el.word        = document.getElementById('ag-word');
        this.el.wordImg     = document.getElementById('ag-word-img');
        this.el.feedback    = document.getElementById('ag-feedback');
        this.el.soundBtn    = document.getElementById('ag-sound-btn');

        this.el.word.addEventListener('click', (e) => this.onWordClick(e));
        this.el.soundBtn.addEventListener('click', () => this.playWordSound());
    },

    /* ============================================================
       نمایش کلمه‌ی بعدی
       ============================================================ */
    showNextWord() {
        this.state.isLocked = false;
        this.hideFeedback();
        if (window.CSS && CSS.highlights) CSS.highlights.clear();

        const pool = this.DB[this.state.letter].words[this.state.form];
        if (!pool || pool.length === 0) {
            this.el.instruction.textContent = 'کلمه‌ای یافت نشد.';
            return;
        }

        let avail = pool.filter(w => !this.state.usedWords.includes(w.w));
        if (avail.length === 0) { this.state.usedWords = []; avail = pool; }
        const pick = avail[Math.floor(Math.random() * avail.length)];
        this.state.usedWords.push(pick.w);
        this.state.wordData = pick;

        this.el.instruction.textContent =
            `حرف «${this.DB[this.state.letter].display}» را در کلمه پیدا کن`;

        this.renderWord(pick.w);
        this.loadWordImage(pick);
    },

    /* ============================================================
       رندر کلمه با رنگ‌های متفاوت
       ============================================================ */
    renderWord(word) {
        this.el.word.classList.remove('long');
        if (word.length > 6) this.el.word.classList.add('long');
        this.el.word.textContent = word;

        if (!(window.CSS && CSS.highlights && window.Highlight)) return;

        const textNode = this.el.word.firstChild;
        if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

        for (let i = 0; i < word.length; i++) {
            const range = document.createRange();
            range.setStart(textNode, i);
            range.setEnd(textNode, i + 1);
            CSS.highlights.set('cc' + i, new Highlight(range));
        }
    },

    /* ============================================================
       بارگذاری تصویر مرتبط با کلمه (از اینترنت)
       ============================================================ */
    async loadWordImage(wordData) {
        const container = this.el.wordImg;
        container.innerHTML = '<p class="img-loading">⏳ در حال بارگذاری تصویر...</p>';

        const keyword = wordData.img || wordData.w;
        const url = await ImageService.getWordImage(keyword);

        if (!url) {
            container.innerHTML = '<p class="img-error">🖼️ تصویر پیدا نشد</p>';
            return;
        }

        const img = new Image();
        img.onload = () => {
            img.alt = wordData.w;
            img.className = 'word-img';
            container.innerHTML = '';
            container.appendChild(img);
        };
        img.onerror = () => {
            container.innerHTML = '<p class="img-error">🖼️ تصویر پیدا نشد</p>';
        };
        img.src = url;
    },

    /* ============================================================
       پخش صدای کلمه
       ============================================================ */
    async playWordSound() {
        const word = this.state.wordData?.w;
        if (!word) return;

        // ۱) صدای ضبط‌شده والدین
        const blob = await ParentService.getRecording(word);
        if (blob) {
            const audio = new Audio(URL.createObjectURL(blob));
            audio.play();
            return;
        }

        // ۲) Web Speech API (فارسی)
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(word);
            u.lang = 'fa-IR';
            u.rate = 0.85;
            speechSynthesis.speak(u);
        }
    },

    /* ============================================================
       تشخیص کاراکتر کلیک‌شده
       ============================================================ */
    onWordClick(event) {
        if (this.state.isLocked || !this.state.wordData) return;
        const idx = this.getClickedCharIndex(event);
        if (idx === -1) return;

        if (idx === this.state.wordData.i) this.onCorrect(idx);
        else this.onWrong(idx);
    },

    getClickedCharIndex(event) {
        const textNode = this.el.word.firstChild;
        if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return -1;
        const text = textNode.textContent;

        if (document.caretPositionFromPoint) {
            const pos = document.caretPositionFromPoint(event.clientX, event.clientY);
            if (pos && pos.offsetNode === textNode) {
                const off = pos.offset;
                for (const cand of [off, off - 1]) {
                    if (cand >= 0 && cand < text.length) {
                        const r = document.createRange();
                        r.setStart(textNode, cand);
                        r.setEnd(textNode, cand + 1);
                        const rect = r.getBoundingClientRect();
                        if (event.clientX >= rect.left - 2 && event.clientX <= rect.right + 2 &&
                            event.clientY >= rect.top - 2 && event.clientY <= rect.bottom + 2) {
                            return cand;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < text.length; i++) {
            const range = document.createRange();
            range.setStart(textNode, i);
            range.setEnd(textNode, i + 1);
            const rect = range.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 &&
                event.clientX >= rect.left && event.clientX <= rect.right &&
                event.clientY >= rect.top && event.clientY <= rect.bottom) {
                return i;
            }
        }
        return -1;
    },

    /* ============================================================
       پاسخ درست
       ============================================================ */
    onCorrect(idx) {
        this.state.isLocked = true;
        GameShell.addScore(1);
        PlayerService.recordAnswer('alphabet', true);

        this.highlightFound(idx);
        this.el.word.classList.add('pop');
        this.el.instruction.textContent = 'آفرین! می‌خوای جایزه ببینی یا کلمه بعدی؟';

        const praises = [
            'آفرین! 🌟','عالی بود! ⭐','دقیق و درست! ✅',
            'بارک‌الله! 👏','هوشمندانه! 🧠','کارت عالیه! 🎉'
        ];
        const msg = praises[Math.floor(Math.random() * praises.length)];

        this.showFeedback('success', `
            <div class="feedback-praise">${msg}</div>
            <div class="feedback-buttons">
                <button class="btn-reward" data-action="reward">🎁 نمایش پاداش</button>
                <button class="btn-next" data-action="next">کلمه بعدی ➜</button>
            </div>
        `);
    },

    /* ============================================================
       پاسخ نادرست
       ============================================================ */
    onWrong(idx) {
        PlayerService.recordAnswer('alphabet', false);

        this.flashWrong(idx);
        this.el.word.classList.add('shake');
        setTimeout(() => this.el.word.classList.remove('shake'), 450);

        const form = this.state.form;
        let pos = 'در کلمه';
        if (form.includes('اول') || form === 'اول') pos = 'در اول کلمه';
        else if (form.includes('وسط') || form === 'وسط') pos = 'در وسط کلمه';
        else if (form.includes('آخر') || form === 'آخر') pos = 'در آخر کلمه';

        const letter = this.DB[this.state.letter].display;
        const edu = `دقت کن! حرف «${letter}» ${pos} قرار داره`;

        const encourages = [
            'دوباره تلاش کن! 💪','تو میتونی! 🌟','نزدیک بود! ✨',
            'با دقت بیشتر! 🎯','نگران نباش، دوباره بگرد! 🔍'
        ];
        const enc = encourages[Math.floor(Math.random() * encourages.length)];

        this.showFeedback('wrong', `
            <div class="feedback-edu">${edu}</div>
            <div class="feedback-encourage">${enc}</div>
            <div class="feedback-buttons">
                <button class="btn-retry" data-action="retry">🔄 تکرار کلمه</button>
                <button class="btn-next" data-action="next">➡️ کلمه بعدی</button>
            </div>
        `);
    },

    /* ============================================================
       پنل بازخورد
       ============================================================ */
    showFeedback(type, html) {
        this.el.feedback.className = 'feedback-panel show ' + type;
        this.el.feedback.innerHTML = html;
        this.el.feedback.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'reward') this.showReward();
                else if (action === 'next') this.showNextWord();
                else if (action === 'retry') this.retryWord();
            });
        });
    },

    hideFeedback() {
        if (this.el.feedback) {
            this.el.feedback.className = 'feedback-panel';
            this.el.feedback.innerHTML = '';
        }
    },

    retryWord() {
        this.state.isLocked = false;
        this.hideFeedback();
        if (window.CSS && CSS.highlights) CSS.highlights.clear();
        this.renderWord(this.state.wordData.w);
    },

    /* ============================================================
       پاداش تمام‌صفحه با تصویر واقعی ماشین راه‌سازی
       ============================================================ */
    async showReward() {
        const overlay = document.createElement('div');
        overlay.className = 'reward-overlay';
        overlay.innerHTML = `
            <div class="reward-loading">⏳ در حال بارگذاری جایزه...</div>
            <img style="display:none" alt="جایزه">
            <div class="reward-text">آفرین ${GameShell.getUserName()}! ⭐ امتیاز: ${GameShell.getScore()}</div>
            <button class="btn-continue">ادامه ➜</button>
        `;
        document.body.appendChild(overlay);

        const img = overlay.querySelector('img');
        const loading = overlay.querySelector('.reward-loading');

        const url = await ImageService.getRewardImage();

        if (url) {
            img.onload = () => {
                img.style.display = 'block';
                loading.style.display = 'none';
            };
            img.onerror = () => {
                loading.textContent = '🎉 آفرین! (عکس در دسترس نیست)';
            };
            img.src = url;
        } else {
            loading.textContent = '🎉 آفرین! (عکس در دسترس نیست)';
        }

        overlay.querySelector('.btn-continue').addEventListener('click', () => {
            overlay.remove();
            this.showNextWord();
        });
    },

    /* ============================================================
       هایلایت
       ============================================================ */
    highlightFound(idx) {
        if (!(window.CSS && CSS.highlights)) return;
        const textNode = this.el.word.firstChild;
        if (!textNode) return;
        CSS.highlights.delete('cc' + idx);
        const range = document.createRange();
        range.setStart(textNode, idx);
        range.setEnd(textNode, idx + 1);
        CSS.highlights.set('found', new Highlight(range));
    },

    flashWrong(idx) {
        if (!(window.CSS && CSS.highlights)) return;
        const textNode = this.el.word.firstChild;
        if (!textNode) return;
        const range = document.createRange();
        range.setStart(textNode, idx);
        range.setEnd(textNode, idx + 1);
        CSS.highlights.set('wrongflash', new Highlight(range));
        setTimeout(() => CSS.highlights.delete('wrongflash'), 400);
    },

    /* ============================================================
       راهنما
       ============================================================ */
    onHintToggle(visible) {
        if (this.el.gameArea) this.el.gameArea.classList.toggle('shifted', visible);
    }
};

GameShell.registerGame(AlphabetGame);
