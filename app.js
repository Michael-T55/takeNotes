document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteInput = document.getElementById('note-input');
    const notesContainer = document.getElementById('notes');

    // Load notes from localStorage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addNoteToDOM(note));
    };

    // Save notes to localStorage
    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Add note to DOM
    const addNoteToDOM = (note) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <p>${note}</p>
            <button>&times;</button>
        `;
        noteElement.querySelector('button').addEventListener('click', () => {
            noteElement.remove();
            deleteNoteFromStorage(note);
        });
        notesContainer.appendChild(noteElement);
    };

    // Delete note from localStorage
    const deleteNoteFromStorage = (noteToDelete) => {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note !== noteToDelete);
        saveNotes(notes);
    };

    // Handle form submission
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const note = noteInput.value.trim();
        if (note) {
            addNoteToDOM(note);
            let notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(note);
            saveNotes(notes);
            noteInput.value = '';
        }
    });

    loadNotes();
});