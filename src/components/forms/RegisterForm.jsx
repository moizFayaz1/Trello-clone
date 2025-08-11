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
import { registerUser } from "@/features/auth/authThunk";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { v4 as generateUUID } from "uuid";
import { useEffect } from "react";
import { ROUTES } from "@/utils/util.constant";
import { slugify } from "@/utils/slugify";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .regex(/^\S+$/, "Username should not contain spaces"),
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

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
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
      const id = generateUUID();
      await dispatch(registerUser({ id: id, ...data })).unwrap();
      await navigate(ROUTES.DASHBOARD(slugify(data.username)));
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
      <p className="text-center py-4 font-semibold">Register To Continue</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-lg"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="text"
                    placeholder="Enter Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="text"
                    placeholder="Enter User Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="email"
                    placeholder="Enter Email"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                    disabled={loading}
                    type="password"
                    placeholder="Enter Password"
                    {...field}
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
            {loading && <Loader2Icon className="animate-spin" />} Register
          </Button>
        </form>
      </Form>
      <div className="flex justify-center items-baseline pt-8 gap-2">
        <p className="text-sm">Already Have Account</p>
        <Link to="/login" className="underline font-bold">
          Login
        </Link>
      </div>
    </>
  );
}
