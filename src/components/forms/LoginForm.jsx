import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoginTrelloIcon from "@/assets/images/icons/trello-login-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authThunk";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { ROUTES } from "@/utils/util.constant";
import { slugify } from "@/utils/slugify";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(30, { message: "Password must be less than 30 characters." }),
  // .regex(/[A-Z]/, { message: "At least one uppercase letter required." })
  // .regex(/[a-z]/, { message: "At least one lowercase letter required." })
  // .regex(/[0-9]/, { message: "At least one number required." })
  // .regex(/[^a-zA-Z0-9]/, { message: "At least one symbol required." }),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await dispatch(loginUser({ email, password })).unwrap();
      await navigate(ROUTES.DASHBOARD(slugify(user.username)));
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <img src={LoginTrelloIcon} alt="" />
      </div>
      <p className="text-center py-4 font-semibold">Login To Continue</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-lg"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="text-lg cursor-pointer"
            disabled={loading}
          >
            {loading && <Loader2Icon className="animate-spin" />} Login
          </Button>
        </form>
      </Form>
      <div className="flex justify-center items-baseline flex-wrap pt-8 gap-2">
        <p className="text-sm">Don't have Account</p>
        <Link to="/register" className="underline font-bold">
          Create New Account
        </Link>
      </div>
    </>
  );
}
