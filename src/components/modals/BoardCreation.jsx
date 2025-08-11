import DESIGN_TOKENS from "@/styles/tokens";
import {
  ChevronDown,
  Earth,
  LockKeyhole,
  UsersRound,
  Loader2Icon,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createBoard,
  getSingleBoardWithList,
} from "@/features/boards/boardThunk";
import { createDefaultBoardList } from "@/lib/create-default-board-list";
import { db } from "@/config/db";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { navigateToBoard } from "@/utils/navigation";

// Form validation schema
const boardFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Board title is required" })
    .max(50, { message: "Board title must be less than 50 characters" })
    .trim(),
  visibility: z.enum(["private", "workspace", "public"], {
    required_error: "Please select a visibility option",
  }),
});

const BoardCreation = ({ onClose, ImageBgUrl, boardColorBg }) => {
  const { loading } = useSelector((state) => state.boards);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(boardFormSchema),
    defaultValues: {
      title: "",
      visibility: "workspace",
    },
  });

  const onSubmit = async (data) => {
    const lastBoard = await db.boards.orderBy("position").last();
    const newPosition = lastBoard ? lastBoard.position + 1 : 1;

    const boardBg = ImageBgUrl ? ImageBgUrl : null;
    const boardBgColor = boardColorBg ? boardColorBg : null;

    try {
      const newBoard = {
        id: nanoid(8),
        title: data.title,
        visibility: data.visibility,
        background_image_url: boardBg,
        background_color: boardBgColor,
        is_archived: false,
        is_starred: false,
        owner_id: currentUser.id,
        workspace_id: "",
        position: newPosition,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await dispatch(createBoard(newBoard)).unwrap();
      await createDefaultBoardList(newBoard.id, dispatch);
      await dispatch(getSingleBoardWithList(newBoard.id));
      // toast.success("Board created successfully!");
      form.reset();
      await navigateToBoard(navigate, newBoard);
      toast.success("Board Created Succesfully! Time To Make Life Easy.")
      onClose();
    } catch (err) {
      console.error("Failed to create board:", err);
      toast.error("Failed to create board. Please try again.");
    }
  };

  // Handle error display
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

  // Visibility options configuration
  const visibilityOptions = [
    {
      value: "private",
      label: "Private",
      icon: LockKeyhole,
      description:
        "Only board members can see this board. Workspace admins can close the board or remove members.",
    },
    {
      value: "workspace",
      label: "Workspace",
      icon: UsersRound,
      description:
        "All members of the Team Co. Workspace can see and edit this board.",
      isSelected: true,
    },
    {
      value: "public",
      label: "Public",
      icon: Earth,
      description:
        "Anyone on the internet can see it. Only workspace members can edit.",
    },
  ];

  const selectedVisibility = form.watch("visibility");
  const selectedOption = visibilityOptions.find(
    (option) => option.value === selectedVisibility
  );

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Board Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Board title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="title__input"
                    placeholder="Enter board title"
                    className="w-full px-3 py-2 text-sm   focus:ring-5 focus:ring-blue-500"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Visibility Field */}
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-sm font-medium">
                  Visibility
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-3 py-2 cursor-pointer  bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                      disabled={loading}
                    >
                      <div className="flex items-center space-x-3">
                        {selectedOption && (
                          <>
                            <selectedOption.icon className="w-4 h-4 text-[#579DFF]" />
                            <span className="text-[#579DFF]">
                              {selectedOption.label}
                            </span>
                          </>
                        )}
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#282E33] border border-slate-600 rounded-lg shadow-lg z-50 flex flex-col overflow-y-auto select-none max-h-[200px]">
                        {visibilityOptions.map((option) => {
                          const IconComponent = option.icon;
                          return (
                            <div
                              key={option.value}
                              onClick={() => {
                                field.onChange(option.value);
                                setIsDropdownOpen(false);
                              }}
                              className={`px-3 py-3 border-l-2 cursor-pointer flex items-start space-x-3 ${
                                option.value === selectedVisibility
                                  ? "bg-[#1C2B41] text-[#579DFF] border-l-2 border-[#579DFF]"
                                  : "hover:bg-slate-600 hover:border-l-2 hover:border-[#579DFF]"
                              }`}
                            >
                              <div className="mt-0.5 self-center">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div
                                  className={`text-sm font-medium ${option.color}`}
                                >
                                  {option.label}
                                </div>
                                <div
                                  className={`text-xs mt-0.5 leading-relaxed ${option.color}`}
                                >
                                  {option.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Workspace Info */}
          <div className="text-slate-400 text-sm">
            This Workspace has{" "}
            <strong className="text-slate-300">5 boards remaining</strong>.
            <br />
            Free Workspaces can only have 10 open boards. For unlimited boards,
            upgrade your Workspace.
          </div>

          {/* Create Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`${DESIGN_TOKENS.colors.primary} cursor-pointer w-full py-2 px-4 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Board"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BoardCreation;
