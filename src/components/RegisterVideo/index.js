import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js';

// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://juavocuafvqfxyazrfeq.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YXZvY3VhZnZxZnh5YXpyZmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjIxMDcsImV4cCI6MTk4Mzc5ODEwN30.jqQODryYG5fGQ-w98zcNFj7yv_jYNUNjQsMsmDGv_s8";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {

    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk"}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    // const [titulo, setTitulo] = React.useState("");
    // const [url, setUrl] = React.useState("");

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();

                        // Contrato entre o Front e o Back
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "games",
                        })
                        .then((oqueveio) => {
                            console.log(oqueveio);
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input 
                                placeholder="Título do Video"
                                name="titulo"
                                values={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}/>
                            <input 
                                placeholder="URL"
                                name="url"
                                values={formCadastro.values.url}
                                onChange={formCadastro.handleChange}/>
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                    )
                : false}
            
        </StyledRegisterVideo>
    )
}