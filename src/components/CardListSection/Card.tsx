interface Props {
    icon: string;
    title: string;
    text: string;
    color: string;
    buttontext: string;
    buttonURL: string;
    downloadFile: boolean;
    downloadFileName: string;
}


const Card = ( props: Props ) => {

    const downloadHref = props.downloadFile
        ? `/src/data/${props.downloadFileName}`
        : props.buttonURL;

        return (
            <div className={"card__bx card__bx__" + props.color}>
                <div className="card__data">
                    <div className="card__icon">
                        <i className={props.icon}></i>
                    </div>
                    <div className="card__content">
                        <h3>{props.title}</h3>
                        <p>{props.text}</p>
                        <a
                            href={downloadHref}
                            {...(props.downloadFile ? { download: props.downloadFileName } : { target: "_blank", rel: "noopener noreferrer" })}
                        >
                            {props.buttontext}
                        </a>
                    </div>
                </div>
            </div>
        );
}
export default Card;