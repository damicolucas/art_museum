import { SyntheticEvent, useRef, useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  IconButton,
  IconButtonProps,
  Grid,
} from "@mui/material";

import { Download, ExpandMore, Share } from "@mui/icons-material";
import { useOutsideClick } from "../../functions/hooks";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  WhatsappShareButton,
  PinterestIcon,
  PinterestShareButton,
} from "react-share";
import { useModal } from "../../contexts/modalContext";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMoreWrapper = styled(({ expand, ...other }: ExpandMoreProps) => {
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cardHeader = {
  display: "block",
  overflow: "hidden",
};

const cardImage = {
  cursor: "pointer",
  transition: "all 500ms ease",
  "&:hover": {
    filter: "blur(2px) brightness(.8)",
  },
};

const hoverIcon = {
  position: "absolute",
  color: "white",
  zIndex: 1,
  transition: "all 500ms ease",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -58%)",
};

type ArtCardProps = {
  card: {
    image_id: string;
    title: string;
    artist_title: string;
    medium_display: string;
    dimensions: string;
    credit_line: string;
  };
};

export default function ArtCard({ card }: ArtCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [shareOptions, setShareOptions] = useState(false);

  const cardRef = useRef(null);
  const { handleModalContent } = useModal();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const closeExpandClick = () => {
    setShareOptions(false);
    setExpanded(false);
  };

  useOutsideClick(cardRef, closeExpandClick);

  return (
    <Card ref={cardRef} sx={{ position: "relative" }}>
      <CardHeader
        sx={cardHeader}
        title={
          <Typography noWrap variant="h6" component="h4">
            {card.title}
          </Typography>
        }
        subheader={
          <Typography noWrap variant="body2" component="p">
            {card.artist_title}
          </Typography>
        }
      />

      <CardMedia
        sx={cardImage}
        component="img"
        height="194"
        image={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
        onError={(e: SyntheticEvent<HTMLImageElement>) =>
          (e.currentTarget.src = "/img/error.png")
        }
        onClick={() => handleModalContent(card)}
        alt={card.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" noWrap={!expanded}>
          {card.medium_display}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <a
          href={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
          target="_blank"
          download
        >
          <IconButton aria-label="download">
            <Download />
          </IconButton>
        </a>

        <IconButton
          aria-label="share"
          onClick={() => {
            setShareOptions(!shareOptions);
          }}
        >
          <Share />
        </IconButton>
        <ExpandMoreWrapper
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </ExpandMoreWrapper>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Dimensions:</Typography>
          <Typography paragraph>{card.dimensions}</Typography>
          <Typography>Credits:</Typography>
          <Typography paragraph>{card.credit_line}</Typography>
        </CardContent>
      </Collapse>
      <Collapse in={shareOptions} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item>
              <FacebookShareButton
                url={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
                quote={card.title}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </Grid>

            <Grid item>
              <TwitterShareButton
                url={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </Grid>

            <Grid item>
              <LinkedinShareButton
                url={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
                title={card.title}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </Grid>

            <Grid item>
              <WhatsappShareButton
                url={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
                title={card.title}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </Grid>

            <Grid item>
              <PinterestShareButton
                url={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
                media={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
                description={card.title}
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}
