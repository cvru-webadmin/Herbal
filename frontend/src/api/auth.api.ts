import { AxiosError, AxiosResponse } from "axios";
import apiInstance from "./api.instance";
import { useMutation } from "@tanstack/react-query";
import userStore from "../store/user.store";
import { toast } from "react-toastify";

const login = async (params: { email: string; password: string }) => {
  const response: AxiosResponse = await apiInstance.post("/auth/login", {
    ...params,
  });
  return response.data;
};

export const useLogin = () => {
  const setUser = userStore((state) => state.setUser);
  return useMutation({
    mutationFn: login,
    mutationKey: ["auth_login"],
    retry: false,
    onSuccess: (data) => {
      setUser(data);
      toast("Success", {
        type: "success",
      });
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

const fetchUser = async () => {
  const response = await apiInstance.get("/auth/fetchUser");
  return response.data;
};

export const useFetchUser = () => {
  const setUser = userStore((state) => state.setUser);
  const removeUser = userStore((state) => state.removeUser);
  return useMutation({
    mutationFn: fetchUser,
    mutationKey: ["auth_fetchuser"],
    retry: false,
    onSuccess: (data) => {
      setUser(data);
      toast("Success", {
        type: "success",
      });
    },
    onError: ({ response }: AxiosError) => {
      removeUser();
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

const logout = async () => {
  const response = await apiInstance.get("/auth/logout");
  return response.data;
};

export const useLogout = () => {
  const removeUser = userStore((state) => state.removeUser);
  return useMutation({
    mutationKey: ["auth_logout"],
    mutationFn: logout,
    retry: false,
    onSuccess: (data) => {
      removeUser();
      toast(data.message, {
        type: "success",
      });
    },
    onError: ({ response }: AxiosError) => {
      removeUser();
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
