const submitBtn = document.querySelector('.submit-el')
const originalUrl = document.querySelector('.original-url-el')
const slicedUrl = document.querySelector('.short-url-el')
const shortlink = document.getElementById('short-link')
const qrBtnCont = document.querySelector('.qr-el')
const qrBtn = document.querySelector('.qrButton-el')
const qrCont = document.querySelector('.qr-image-cont')
const qrImage = document.getElementById('qr-image')
const copyBtn = document.getElementById('copyBtn')
const warning = document.querySelector('.warning')
const redirectEl = document.querySelector('.redirect-el')

submitBtn.addEventListener ('click',()=>{
		if(originalUrl.value === ''){
			alert('Please provide a Url')
		}
		isValidUrl(`${originalUrl.value}`) ?
		(async () => {
		  const shortUrl = await urlSlicer();
		  slicedUrl.style.display = 'flex';
		  qrBtnCont.style.visibility = 'visible';
		  shortlink.textContent = `localhost:5000/urlSlicer/${shortUrl}`;
		  originalUrl.value = ''
		})() :
		(() => {
		  warning.textContent = 'Invalid Url Provided'
		  warning.classList.toggle('display')
		  setTimeout(()=>{
			warning.classList.toggle('display')
			warning.textContent = '';
		  },2000)
		})();	
	}
)


// Function to generate the qr image
const qrGenerator = async()=>{
	try {
		qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${shortlink.value}`
		qrCont.classList.add('show')
	} catch (error) {
		console.log(error);
	}
}
qrBtn.addEventListener('click', qrGenerator)

//Function to slice the url
const urlSlicer = async () => {
    try {
        // Make a POST request to create a new short URL
        const {data: {shorterUrl: {shortUrl}}} = await axios.post('http://localhost:5000/urlSlicer/original', {originalUrl: originalUrl.value});
		console.log(shortUrl);
        return shortUrl;
    } catch (error) {
        console.error('Error creating short URL:', error);
        throw error;
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

// Copy button event
	copyBtn.addEventListener('click', () => {	
		const textToCopy = shortlink.textContent;
		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				warning.textContent = 'Text copied!'
				warning.classList.toggle('display');
				setTimeout(() => {
					warning.classList.toggle('display')
					warning.textContent = ''
				}, 2000);
			})
			.catch(err => {
				console.error('Failed to copy text: ', err);
			});
	});

redirectEl.addEventListener('click',()=>{
	window.location.href = `http://${shortlink.textContent}`
})
