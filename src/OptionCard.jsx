import {
    DocumentCard,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardDetails
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';

export default function OptionCard(props) {

    const previewProps = {
        previewImages: [
            {
                previewImageSrc: props.option.image,
                imageFit: ImageFit.contain,

            },
        ],
    };

    return (
        <DocumentCard
            style={{ margin: "20px", minWidth:"100px", maxWidth:"150px" }}
            onClick={() => props.onClickHandler(props.option)}
        >
            <DocumentCardPreview {...previewProps} />

            <DocumentCardTitle
                title={props.option.label}
            />
            <div style={{ margin: "15px" }}>
                <DocumentCardDetails >These are some details that will be given about the service.</DocumentCardDetails>
            </div>
        </DocumentCard>
    )
}