import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { CircularProgress, Grid } from "@mui/material";

import { getImages } from "../functions/requests/get";
import { usePagination } from "../contexts/paginationContext";
import ArtCardModal from "../components/artCardModal";
import ArtContent from "../components/artContent";

type listsData = {
  data: [];
  pagination: { total_pages: number };
};

const Home: NextPage = () => {
  const [data, setData] = useState<listsData>({
    data: [],
    pagination: { total_pages: 1 },
  });

  const [loading, setLoading] = useState(false);

  const { page } = usePagination();

  useEffect(() => {
    getImages(page, setData, setLoading);
  }, [page]);

  return (
    <Grid item container>
      <ArtCardModal />
      <Grid item xs={1} sm={2} />
      <Grid
        item
        xs={10}
        sm={8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          paddingBlock: "2rem",
        }}
      >
        {loading ? <CircularProgress /> : <ArtContent data={data} />}
      </Grid>
      <Grid item xs={1} sm={2} />
    </Grid>
  );
};

export default Home;
