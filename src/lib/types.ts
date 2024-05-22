import * as z from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z
    .string()
    .describe("Password")
    .min(3, "Password must have atleast 3 charecters"),
});

export const CreateWorkspaceFormSchema = z.object({
  workspaceName: z
    .string()
    .describe("Workspace Name")
    .min(1, "Workspace Name must have minimum 1 character"),
  logo: z.any(),
});
