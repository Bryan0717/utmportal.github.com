// Feedback specific JavaScript

function submitFeedback(event) {
    event.preventDefault();
    
    // Get form values
    const form = event.target;
    const supervisor = form.querySelector('select').value;
    const feedback = form.querySelector('textarea').value;
    
    // Here you would normally send this data to your server
    console.log('Feedback submitted:', { supervisor, feedback });
    
    // Show success message
    alert('Thank you for your feedback! Your response has been submitted.');
    
    // Reset form
    form.reset();
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}