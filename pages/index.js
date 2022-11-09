import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    
    const estilosDaHomePage = {

    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    return (
        <>
            <CSSReset />
            <div style={estilosDaHomePage}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                {/* <Banner></Banner> */}
                <Header></Header>
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    {/* Conteudo */}
                </Timeline>
                <Favorites favorites={config.favorites}>
                    {/* Conteudo */}
                </Favorites>
            </div>
        </>
    )
}

export default HomePage

const StyledBanner = styled.div`

        height: 230px;
        background-color: red;
        background-image: url(${({ bg }) => bg});
        /* background-image: url(${config.banner}); */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

    `

// function Banner() {
//     return (
//         <StyledBanner />
//     )
// }

const StyledHeader = styled.div`

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .user-info {
            display: flex;
            align-items: center;
            width: 100%;
            padding:  16px 32px;
            gap: 16px;
        }
        
    `;

function Header() {    

    return (
        <StyledHeader>
            <StyledBanner bg={config.banner}/>
            {/* <StyledBanner /> */}
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {
    
    const playListNames = Object.keys(props.playlists)
    // Statement
    // Retorno por expressao

    return (
        <StyledTimeline>
            {playListNames.map((playListName) => {
                const videos = props.playlists[playListName];
                return (
                    <section key={playListName}>
                        <h2>{playListName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />                        
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )    
}

const StyledFavors = styled.div`

        flex: 1;
        width: 100%;
        padding: 10px 32px 10px 32px;
        overflow: hidden;

        h2 {
            font-size: 16px;
            margin-bottom: 16px;
            text-transform: capitalize;
        }
        section {
            display: flex;
        }
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .favor-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 120px;
            padding: 16px 16px;
        }
        
    `;

function Favorites(props) {    

    const favoriteNames = Object.keys(props.favorites)

    return(
        <StyledFavors>            
            <h2>Favoritos</h2>
            <section>
                {                
                    favoriteNames.map((favoriteName) => {
                        const favors = props.favorites[favoriteName];
                        return (                        
                            <section key={favoriteName} className="favor-info">
                                <div>
                                    <img src={favors.perfil_image} />
                                </div>
                                <p>{favors.name}</p>
                            </section>
                        )                    
                    })
                }
            </section>
        </StyledFavors>
    )
}