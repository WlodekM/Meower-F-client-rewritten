// Literally a way to make 2 lines of code into one line of code

import {
    modalShown,
    modalPage,
    basicModalDesc,
    basicModalTitle
} from "./stores.js";

export function showModal(modal, title, description) {
    basicModalTitle.set("");
    basicModalDesc.set("");
    if (modal === "BasicModal") {
        if (!title) throw new Error("No title set");
        if (!description) throw new Error("No description set");

        basicModalTitle.set(title);
        basicModalDesc.set(description);
    }
    // Save a bit of processing time removing that else statement
    // Of course we don't need to sqeeze out performance.

    modalPage.set(modal);
    modalShown.set(true);
}

export function CloseModal() {
    modalShown.set(false)
}


import {modalStack} from "./stores.js";

let _modalStack = [];
modalStack.subscribe(v => (_modalStack = v));

export function showModalX(modal, data) {
	_modalStack.unshift({modal, data});
	modalStack.set(_modalStack);
}

export function replaceLastModal(modal, data) {
	_modalStack.splice(0, 1);
	_modalStack.unshift({modal, data});
	modalStack.set(_modalStack);
}

export function closeLastModal() {
    modalShown.set(false)
	_modalStack.splice(0, 1);
	modalStack.set(_modalStack);
}

export function closeAllModals() {
	modalStack.set([]);
}
