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
    console.log('alright');
  }



})

}





// objects


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



