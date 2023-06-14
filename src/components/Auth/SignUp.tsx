import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NewUserRoot } from "../../store/models/userModels";
import { useAddNewUserMutation } from "../../store/api/user";
import { toast } from "react-toastify";
import { useSigInMutation } from "../../store/api/auth";
import { useNavigate } from "react-router-dom";
type Props = {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};
export function SignUp({ display, setDisplay }: Props) {
  const [cpass, setCpass] = React.useState("");
  const confirmPass = React.useRef({});
  const navigate = useNavigate();
  const [signUp, resultSing] = useAddNewUserMutation();
  const [login, resultAuth] = useSigInMutation();
  const { handleSubmit, control, watch, formState } = useForm<
    Omit<NewUserRoot, "user.is_admin">
  >({
    defaultValues: {
      user: {
        username: "",
        password: "",
      },
      user_address: {
        street_address: "",
        postal_code: "",
        city: "",
        country_id: 2,
      },
      user_detail: {
        first_name: "",
        last_name: "",
        user_image: "",
      },
      user_phones: [
        {
          phone_number: "",
          type: "",
        },
      ],
    },
  });
  const { errors } = formState;
  confirmPass.current = watch("user.password", "");
  const sign = async (name: string, password: string) =>
    await login({
      username: name,
      password,
    })
      .unwrap()
      .then((response) => navigate("/", { replace: true }))
      .catch((error) =>
        toast.error(`${error.data.detail}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );

  const btnSubmit: SubmitHandler<Omit<NewUserRoot, "user.is_admin">> = async (
    data
  ) =>
    await signUp(data)
      .unwrap()
      .then((response) => {
        toast.success(`Добро пожаловать ${response.user.username}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(
          () => sign(response.user.username, data.user.password),
          2000
        );
      })
      .catch((error) =>
        toast.error(`${error.data.detail}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );

  return (
    <div
      className={` py-2 ${
        display ? "hidden" : "flex"
      } flex-col justify-between items-center transition-all duration-200`}
    >
      <form onSubmit={handleSubmit(btnSubmit)}>
        <Controller
          control={control}
          name="user.username"
          rules={{
            required: "Обьязательное поля",
            validate: (value: string) => {
              if (value.length < 3) {
                return "Логин не может меньше 3-х симболов";
              }
              if (value.match(/[а-яА-я]/)) {
                return "Логин не может содержать русские буквы";
              }
              return true;
            },
          }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextField
                label="Username"
                variant="outlined"
                className="w-full"
                type="text"
                onChange={onChange}
                value={value ? value : ""}
                helperText={errors.user?.username?.message}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="user.password"
          rules={{
            required: "Обьязательное поля",
          }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                sx={{
                  marginTop: 2,
                  width: "100%",
                }}
                onChange={onChange}
                value={value ? value : ""}
              />
            );
          }}
        />
        <TextField
          name="confirmpass"
          inputRef={confirmPass}
          label="Confirm Password"
          type="password"
          sx={{
            marginTop: 2,
            width: "100%",
          }}
          onChange={(e) => setCpass(e.target.value)}
          helperText={
            confirmPass.current && cpass !== confirmPass.current
              ? "Парол не совпадаеть!"
              : ""
          }
        />

        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 2, width: "100%" }}
          type="submit"
          disabled={resultAuth.isLoading}
        >
          Sign Up
        </Button>
      </form>
      <div>
        <span className="mr-2">{display ? "" : "Уже есть аккаунт?"}</span>
        <button
          onClick={() => setDisplay((display) => !display)}
          className="text-[#da002b]"
        >
          {display ? "" : "Войти"}
        </button>
      </div>
    </div>
  );
}
