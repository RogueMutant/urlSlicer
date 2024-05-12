const submitBtn = document.querySelector('.submit-el')
const originalUrl = document.querySelector('.original-url-el')
const slicedUrl = document.querySelector('.short-url-el')
const headerEl = document.querySelector('.header')
const qrBtnCont = document.querySelector('.qr-el')
const qrCont = document.querySelector('.qr-image-cont')
const qrImage = document.getElementById('qr-image')
const qrBtn = document.querySelector('.qrButton-el')
const copyBtn = document.getElementById('copyBtn')

submitBtn.addEventListener ('click',async()=>{
	try {
		if(originalUrl.value === ''){
			alert('Please provide a Url')
		}
		if(isValidUrl(`${originalUrl.value}`)){
			// proceed to shorten the url 
			const shortUrl =  await urlSlicer()
			slicedUrl.style.display = 'flex'
			qrBtnCont.style.visibility = 'visible'
			let paraEl = document.createElement('p')
			paraEl.textContent = `localhost:5000/urlSlicer/${shortUrl}`
			slicedUrl.appendChild(paraEl)
		}
	} catch (error) {
			let paraEl = document.createElement('p')
			paraEl.innerHTML = 'Invalid Url Provided'
			headerEl.appendChild(paraEl)
			setTimeout(()=>{
				paraEl.style.display = 'none'
			}, 2000)
			return error
	}
	
})



// Function to generate the qr image
const qrGenerator = async()=>{
	try {
		qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${originalUrl.value}`
		qrCont.classList.add('show')
	} catch (error) {
		console.log(error);
	}
}
qrBtn.addEventListener('click', qrGenerator)

//Function to slice the url
const urlSlicer = async () => {
    // const originalUrl = { originalUrl: originalUrl.value }; 

    try {
        // Make a POST request to create a new short URL
        const {data: {shorterUrl: {shortUrl}}} = await axios.post('http://localhost:5000/urlSlicer/original', {originalUrl: originalUrl.value});
		console.log(shortUrl);
        return shortUrl; // Return the shortened URL
    } catch (error) {
        console.error('Error creating short URL:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
};


// Function to validate the url
 function isValidUrl(url){
	try {
		new URL(url)
		return true
	} catch (error) {
		console.log(error);
		return false
	}
}

// Copy function
// document.addEventListener('copy', (event) => {
//     const selection = document.getSelection();
//     event.clipboardData.setData('text/plain', selection.toString());
//     event.preventDefault();
// });
