$(document).ready(function(){
    condolences.init();
    $('.sendConlences').on('click', function(event){
        event.preventDefault();
        condolences.submitForm(event);
    })
});

var condolences = {
    init: function(){
        this.getDOM();
        this.getMessages();
    },

    getDOM: function(){
        this.$messagesContainer = $(".messages");
        this.form = $('#newMessage');
        this.sendConlencesBtn = $('sendConlences');
    },

    getMessages: function(){
        var self = this;
        $.get( "https://vietify.org/message", function( data ) {
            self.messages = data;
            self.renderMessages();
        });
    },

    renderMessages: function(){
        var html = "";
        this.messages.forEach(function(message) {
            html += "<div class='item'>";
            html += "<h4>"+ message.name +"</h4>";
            html += "<div class='message'>";
            html += "<p>" + message.message+ "</p>"
            html += "</div>"
            html += "</div>"
            html += "</div>";
        });
        this.$messagesContainer.html(html);
    },
    
    clearForm: function(){
        $("#newMessage").trigger("reset");
    },

    submitForm: function(e){
        var formData = $("#newMessage").serialize();
        var self = this;
        $.ajax({
            type: 'POST',
            url: "https://vietify.org/message",
            data: formData
        }).done(function(){
            condolences.getMessages();
            condolences.clearForm();
        })
    }
}

