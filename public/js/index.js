console.log('Javascript Started!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const M1 = document.querySelector('#message-1')
const M2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const code ='<div class="spinner-border text-primary" role="status">'+
    '<span class="sr-only">Loading...</span>'+'</div>'
    M1.textContent = 'Loading..'
    M2.innerHTML = code

    fetch('/weather?address='+encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                M1.textContent = data.error
            }else{
                M1.textContent = data.location
                M2.textContent = data.forecast
            }
        })
    })
})

document.querySelector('#find-me').addEventListener('click', () => {

  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      fetch('/weather?latitude='+encodeURIComponent(latitude)+'&longitude='+encodeURIComponent(longitude)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                M1.textContent = data.error
            }else{
                M1.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
                M1.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`+" with location accuracy of- "+position.coords.accuracy/1000+" KM";
                M2.textContent = data.forecast
            }
        })
    })
    }
  
    function error() {
      M1.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      M1.textContent = 'Geolocation is not supported by your browser';
    } else {
      M1.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  });