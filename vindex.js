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

	el("log").innerHTML = files[0].name;
	
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
