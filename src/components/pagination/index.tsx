import { Grid, Pagination } from "@mui/material";
import { usePagination } from "../../contexts/paginationContext";

type PaginationComponetProps = {
  paginationCount: number;
};
export default function PaginationComponet({
  paginationCount,
}: PaginationComponetProps) {
  const { page, handlePagination } = usePagination();

  return (
    <Grid
      item
      xs={12}
      sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}
    >
      <Pagination
        size="small"
        page={page}
        count={paginationCount}
        variant="outlined"
        shape="rounded"
        onChange={handlePagination}
      />
    </Grid>
  );
}
