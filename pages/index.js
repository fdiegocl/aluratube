import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    
    const estilosDaHomePage = {

    };

    return (
        <>
            <CSSReset />
            <div style={estilosDaHomePage}>
                <Menu></Menu>
                <Banner></Banner>
                <Header></Header>
                <Timeline playlists={config.playlists}>
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

        section {
            height: 230px;
            background-image: url("https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

    `

function Banner() {    

    return (

        <StyledBanner>
            <section></section>
        </StyledBanner>

    )

}

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

function Timeline(props) {
    
    const playListNames = Object.keys(props.playlists)
    // Statement
    // Retorno por expressao

    return (
        <StyledTimeline>
            {playListNames.map((playListName) => {
                const videos = props.playlists[playListName];
                console.log(playListName);
                console.log(videos);
                return (
                    <section>
                        <h2>{playListName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
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
    console.log(config.favorites)

    return(
        <StyledFavors>            
            <h2>Favoritos</h2>
            <section>
                {                
                    favoriteNames.map((favoriteName) => {
                        const favors = props.favorites[favoriteName];
                        return (                        
                            <section className="favor-info">
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