const filePickerEle = document.getElementById('image');
const imagePreviewEle = document.getElementById('image-preview');

function showPreview(){
    const files = filePickerEle.files;
    if(!files || files.length === 0){
        imagePreviewEle.style.display = 'none';
        return;
    }
    
    const pickedFile = files[0];
    imagePreviewEle.src = URL.createObjectURL(pickedFile); // creates a local url only works on the computer of the visitor to this file on the visitor's computer
    imagePreviewEle.style.display = 'block';
}

filePickerEle.addEventListener('change', showPreview);