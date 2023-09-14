import React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
    title: string;
}

function Title(props: TitleProps) {
    const {title} = props;

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                :: {getTitle(title)}
            </Typography><p/>
        </div> 
    );
}

function getTitle(title:string){
    if(title==='홈'){
        return title
    }else{
        return `${title} 대기오염 정보 조회`;
    }
}

export default Title;
