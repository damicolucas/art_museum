import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

import { CircularProgress, Grid } from "@mui/material";

import { getImages } from "../functions/requests/get";
import { usePagination } from "../contexts/paginationContext";
import ArtCardModal from "../components/artCardModal";
import ArtContent from "../components/artContent";
import api from "../services/api";

type listsData = {
  data: [];
  pagination: { total_pages: number; current_page: number };
};

type HomeProps = NextPage & {
  firstData: listsData;
};

const Home = ({ firstData }: HomeProps) => {
  const [data, setData] = useState<listsData>(firstData);
  const [loading, setLoading] = useState(false);

  const { page } = usePagination();

  useEffect(() => {
    if (page > 1 || data.pagination.current_page !== 1) {
      getImages(page, setData, setLoading);
    }
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

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/artworks", {
    params: {
      page: 1,
      limit: 27,
    },
  });

  return {
    props: {
      firstData: {
        data: data.data,
        pagination: data.pagination,
      },
    },
    revalidate: 60 * 60 * 8,
  };
};

export default Home;
