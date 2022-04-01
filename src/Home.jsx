import { Label } from '@fluentui/react/lib/Label';

export default function Home(props){

    const labelStyle = {fontFamily:props.theme.fonts.xLarge.fontFamily, fontSize:props.theme.fonts.large.fontSize, color:props.theme.palette.themePrimary, paddingRight: "20px"}
    const labelStyleSeparator = {fontFamily:props.theme.fonts.xLarge.fontFamily, fontSize:props.theme.fonts.large.fontSize, color:props.theme.palette.black, paddingRight: "20px"}

    return(
        <div style={{paddingLeft : "0px", paddingTop : "100px"}}>
            <Label theme={props.theme} style={{fontFamily:props.theme.fonts.xxLarge.fontFamily, fontSize:props.theme.fonts.xLarge.fontSize}}>What would you like to do?</Label>
            <div style={{display:"flex", paddingTop : "50px"}}>
                <Label id="CONFIGURE_PIPELINE" onClick={(e)=>props.onClick(e)} style={labelStyle}>Configure A New Pipeline</Label>
                <Label style={labelStyleSeparator}>|</Label>
                <Label id="CURRENT_PIPELINE" onClick={(e)=>props.onClick(e)} style={labelStyle}>View The Existing Pipeline</Label>
                <Label style={labelStyleSeparator}>|</Label>
                <Label id="UPLOAD_DOCUMENTS" onClick={(e)=>props.onClick(e)} style={labelStyle}>Ingest Documents</Label>
                <Label style={labelStyleSeparator}>|</Label>
                <Label id="insights" onClick={(e)=>props.onClick(e)} style={labelStyle}>View Insights</Label>
            </div>
        </div>
        
    )
}