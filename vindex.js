function el(id){return document.getElementById(id);} // Get elem by ID

el("video").addEventListener("drop", drop_video, false);
el("mp4").addEventListener("drop", drop_video, false);

// from https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
el("video").addEventListener("dragenter", dragenter, false);
el("video").addEventListener("dragover", dragover, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop_video(e) {
	e.stopPropagation();
	e.preventDefault();

	var dt = e.dataTransfer;
	var files = dt.files;

    el("mp4").src = window.URL.createObjectURL( files[0] );

	el("log").innerHTML = "# log for file : " + files[0].name;
	el("logFileName").value = files[0].name + ".log.txt";
	
	el("video").load();
}

function registerState(state) {
	el("log").innerHTML = state + " at " + el("video").currentTime + "\n" + el("log").innerHTML;
}

function registerSleep() {
	registerState("sleep");
}

function registerAwake() {
	registerState("awake");
}

// Functions to save textarea from http://cssdeck.com/labs/7bx7mmcm

function saveTextAsFile()
{
	var textToWrite = document.getElementById("log").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = document.getElementById("logFileName").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("log").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}
