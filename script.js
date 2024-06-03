document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("myForm");

    form.addEventListener("submit", async function(event){
        event.preventDefault();

        try {
            const formData = new FormData(form);
            const response = await submitForm(formData);

            if(response.success){
                showSuccessMessage("Formulario enviado con exito");
                form.reset();
            }else {
                showErrorMessage("Error al enviar el formulario, intentelo mas tarde");
            }
        } catch (error) {
            console.log("Error al enviar el formulario;", error);
            showErrorMessage("Se produjo un error al enviar el formulario, intentelo mas tarde");
        }
    });

    async function submitForm(formData){
        const url = "https://example.com/api/submit-form";
        const options = {
            method: "POST",
            body: formData
        };

        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error("Error en la solicitud;" + response.status);
        }

        return await response.json();
    }

    function showSuccessMessage(message){
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.textContent = message;
        document.body.appendChild(successMessage);

        setTimeout(function(){
            document.body.removeChild(successMessage);
        }, 5000);
    }

    function showErrorMessage(message){
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent = message;
        document.body.appendChild(errorMessage);

        setTimeout(function (){
            document.body.removeChild(errorMessage);
        }, 5000);
    }

});