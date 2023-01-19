// variebles

const form = document.querySelector('#request-quote')

const html = new HTMLUI()






// eventlistenters


eventlisteners()

function eventlisteners() {
  

// make option tag for select

document.addEventListener('DOMContentLoaded', function () {
    


    // display the <option>

    
    html.displayYears()
})




// submit form when click



form.addEventListener('submit', function(e){
  
  e.preventDefault()

  // read value from the form
  const make = document.getElementById('make').value

  const year = document.getElementById('year').value

  const level = document.querySelector('input[name="level"]:checked').value
  

  // check the value of fields are correct

  if (make == '' || year == ''  || level == '') {
    
    html.displayError('لطفا همه مقادیر به درستی وارد شود')
  } else {

    let resultDiv = document.querySelector('#result div')
    
    if (resultDiv !== null) {
      resultDiv.remove()
    }

    const insurance = new Insurance(make, year, level)
    
    const price = insurance.calcaulatePrice(insurance)
    html.showResult(price, insurance)
  }



})

}



/* =======================|objects|========================== */

// objects


// every thing related to the insurance



function Insurance(make, year, level) {

  this.make = make,
  this.year = year,
  this.level = level
  
}



// calculating the price

Insurance.prototype.calcaulatePrice = function(info) {
  
  let price;

  let base = 2000000


// get the make value


  const make = info.make


  /*
  
  make:1 ===> pride    1.15
  make:2 ===> optima   1.30
  make:3 ===> porsche  1.80
  
  
  
  */

  switch (make) {
    case '1':
      price = base * 1.15
      break;
  

      case '2':
      price = base * 1.30
      break;


      case '3':
      price = base * 1.80
      break;
    

  }
  

  
  // get the year

  const year = info.year
  const diffrence = this.getYearDiffrence(year)
  console.log(diffrence);


  // 3% cheaper for each year

  price = price - (((diffrence*3)/100)*price)


  // get the level


  const level = info.level

  price = this.calcaulateLevel(level, price)
  
  return price;


}





// 

Insurance.prototype.getYearDiffrence = function(year) {
  
  let
  persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
  fixNumbers = function (str)
  {
    if(typeof str === 'string')
    {
      for(let i=0; i<10; i++)
      {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  };
  
      // get max year
  
      const now = new Date().toLocaleDateString('fa-IR')
      let nowYear = now.slice(0,4)
          max =fixNumbers(nowYear)
  
    year = max- year
    return year;
  
  
      
}



Insurance.prototype.calcaulateLevel = function (level, price) {
  
  /*
  
  basic ===> increase 30%
  complete ===> increase 50%
  
  */

  if (level == 'basic') {

    price = price * 1.30

  } else {
    
      price = price * 1.50
  }

return price;

}


// every thing related to the html



function HTMLUI(){}


// display years


HTMLUI.prototype.displayYears = function(){


    let
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(let i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

    // get max year

    const now = new Date().toLocaleDateString('fa-IR')
    let nowYear = now.slice(0,4)
        max =fixNumbers(nowYear)

        console.log(max);




    // min year


    let min = max - 20

    // access to the select tag

      const selectYear = document.querySelector('#year')



    // create for loop for making option tag


    for (let i = max; i >= min; i--){
      
     // create option

      const option = document.createElement('option')
      option.value = i
      option.innerText = i


      // append option to the selectYear

      selectYear.appendChild(option)

    }

}


// display errors on the form


HTMLUI.prototype.displayError = function(err){

  const div = document.createElement('div')
  div.classList = 'error'
  div.innerText = err


  // insert div to the form


  form.insertBefore(div, document.querySelector('.form-group'))


  // remove erorr after 3seconds
  setTimeout(() => {
    document.querySelector('.error').remove()
  }, 3000);
  
}



// display factor in the form

HTMLUI.prototype.showResult = function(price, info) {
  


  // access to the div result


  const result = document.querySelector('#result')


  // create div for showing price

  const div = document.createElement('div')

 // convert make value to the car


 let make = info.make


  /*
  
  make:1 ===> pride    
  make:2 ===> optima   
  make:3 ===> porsche  
  
  
  
  */

  switch (make) {
    case '1':
      make = 'پراید'
      break;
  

      case '2':
        make = 'اپتیما'
      break;


      case '3':
        make = 'پورشه'
      break;
    

  }



  // convert level to the persian

   /*
  
  basic ===> ساده
  complete ===> کامل
  
  */

  let level = info.level

  if (level == 'basic') {

    level = 'ساده'

  } else {
    
    level = 'کامل'
  }
  



  div.innerHTML = `
  <p class="header">خلاصه فاکتور</p>
  <p>مدل ماشین : ${make}</p>
  <p>سال ساخت : ${info.year}</p>
  <p>نوع بیمه : ${level}</p>
  <p class="total">قیمت نهایی : ${price}</p>
  `


  // show spinner

  const spinnner = document.querySelector('#loading img')
  spinnner.style.display = 'block'

    // hide spinner after 2 second and show the result

  setTimeout(() => {

    // hide spinner 


    spinnner.style.display = 'none'
    
    // append div to the result
     result.appendChild(div)
  }, 2000);

  


}