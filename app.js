const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            messages: [],
            userInput: '',
        };
    },
    methods: {
        async sendMessage() {
            if (!this.userInput.trim()) return;

            this.messages.push({ id: Date.now(), text: this.userInput, sender: 'user' });

            try {
                const response = await fetch("http://localhost:5000/generate", { // Use Flask with 5000 instead
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ instruction: this.userInput })
                });

                const data = await response.json();
                this.messages.push({ id: Date.now(), text: data.generated_text || "Sorry, I couldn't understand.", sender: 'bot' });

            } catch (error) {
                console.error("Error:", error);
                this.messages.push({ id: Date.now(), text: "Server error. Please try again later.", sender: 'bot' });
            }

            this.userInput = '';
        }
    }
}).mount('#app');

document.getElementById("toggle-btn").addEventListener("click", function() {
    let chatBox = document.getElementById("app");
    chatBox.style.display = chatBox.style.display === "none" || chatBox.style.display === "" ? "block" : "none";
});
