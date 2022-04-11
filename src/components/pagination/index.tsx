import { Grid, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { usePagination } from "../../contexts/paginationContext";

const useStyles = makeStyles({
  paginationContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
});

type PaginationComponetProps = {
  paginationCount: number;
};
export default function PaginationComponet({
  paginationCount,
}: PaginationComponetProps) {
  const classes = useStyles();
  const { page, handlePagination } = usePagination();

  return (
    <Grid spacing={2} item xs={12} className={classes.paginationContainer}>
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
