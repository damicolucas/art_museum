import { Grid } from "@mui/material";
import ArtCard from "../artCard";
import Pagination from "../pagination";

type ArtContentProps = {
  data: { data: []; pagination: { total_pages: number } };
};
export default function ArtContent({ data }: ArtContentProps) {
  return (
    <Grid container spacing={4}>
      {data.data?.map((card, i) => {
        return (
          <Grid item xs={12} sm={6} md={4}>
            <ArtCard key={i} card={card} />
          </Grid>
        );
      })}
      <Pagination paginationCount={data?.pagination?.total_pages} />
    </Grid>
  );
}
