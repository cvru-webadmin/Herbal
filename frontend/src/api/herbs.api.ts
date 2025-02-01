import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import apiInstance from "./api.instance";
import { IHerbsSchema } from "../types/herbs";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { handleSubmit } from "../utils/addherbs.utility";
import { useNavigate } from "react-router-dom";

const getHerbs = async (params: {
  name: string;
  synonyms: string[] | string;
  uses: string[] | string;
  page: number;
}) => {
  const response = await apiInstance("/herbs/get-herbs", {
    params: { ...params, pageSize: 5 },
  });
  return response.data;
};

export const useGetHerbs = (params: {
  name: string;
  synonyms: string[] | string;
  uses: string[] | string;
}): UseQueryResult<{
  currentPage: number;
  herbs: IHerbsSchema[];
  totalCount: number;
  totalPages: number;
}> => {
  return useQuery({
    queryFn: () => getHerbs({ ...params, page: 1 }),
    queryKey: ["get_herbs", params.name, params.synonyms, params.uses],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const getAllHerbs = (params: {
  name: string;
  synonyms: string[] | string;
  uses: string[] | string;
}) => {
  return useInfiniteQuery({
    queryKey: ["get_herbs", params.name, params.synonyms, params.uses],
    queryFn: ({ pageParam = 1 }) => getHerbs({ ...params, page: pageParam }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * 6;
      if (totalFetched < lastPage.totalCount) {
        return allPages.length + 1;
      }
      return undefined;
    },
    // @ts-ignore
    initialPageParam: 1,
    retry: 1,
    select: (data: any) => {
      return {
        data: data.pages.flatMap((pages: any) => pages.herbs),
        totalCount: data.pages[0].totalCount,
      };
    },
  });
};

// const addHerbs = async (params: any) => {
//   const response = await apiInstance.post("/addHerb", params, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export const useAddHerbs = () => {
  return useMutation({
    mutationKey: ["add_herbs"],
    mutationFn: handleSubmit,
    retry: 1,
    onSuccess: () => {
      toast("Uploaded", {
        type: "success",
        toastId: "123",
      });
      localStorage.removeItem("herbs");
      localStorage.removeItem("otherDetails");
      // navigate(`/herb/${data.data._id}`);
    },
    onError: ({ response }: AxiosError) => {
      if (!response) {
        toast("Something went wrong", {
          type: "error",
        });
        return 0;
      }

      const data = response.data as { name: string; message: string };
      if (data) {
        toast(data.message, {
          type: "warning",
        });
      }
    },
  });
};

const getHerb = async (id: string) => {
  const response = await apiInstance.get(`/herbs/get/${id}`);
  return response.data;
};

export const useGetHerb = (id: string) => {
  return useQuery({
    queryFn: () => getHerb(id),
    queryKey: ["get_herb", id],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const deleteHerb = async (id: string) => {
  const response = await apiInstance.delete(`/herbs/delete/${id}`);
  return response.data;
};

export const useDeleteHerb = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["delete_herb"],
    mutationFn: deleteHerb,
    retry: 1,
    onSuccess: () => {
      toast("Deleted", {
        type: "info",
        toastId: "123",
      });
      navigate("/all");
    },
    onError: ({ response }: AxiosError) => {
      if (!response) {
        toast("Something went wrong", {
          type: "error",
        });
        return 0;
      }

      const data = response.data as { name: string; message: string };
      if (data) {
        toast(data.message, {
          type: "warning",
        });
      }
    },
  });
};
