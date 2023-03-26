import "../layouts/card.css";

export function ChooseCard(props){
    return(
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <p className="title">{props.name}</p>
                    <p>Check Information</p>
                </div>
                <div className="flip-card-back">
                    <p className="title">{props.introduction}</p>
                    <p>Leave</p>
                </div>
            </div>
        </div>
    );
}