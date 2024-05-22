"use server";
import * as z from "zod";
import { FormSchema } from "../types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function actionLogionUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
}

// export async function actionSignUpUser({
//   email,
//   password,
// }: z.infer<typeof FormSchema>) {
//   const supabase = createRouteHandlerClient({ cookies });

//   console.log("supabase : ", supabase);

//   // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Replace with your Supabase URL
//   // const supabaseKey = process.env.SERVICE_ROLE_KEY; // Replace with your Supabase API key
//   // if (!supabaseUrl || !supabaseKey) throw Error("Not STRING");

//   // const supabase = createClient(supabaseUrl, supabaseKey);

//   console.log("email,password : ", email, password);

//   const { data } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("email", email);

//   if (data?.length) return { error: { message: "User already exists", data } };

//   const response = await supabase.auth.signUp({
//     email,
//     password,
//     // options: {
//     //   emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
//     // },
//   });

//   console.log("response  : ", response);

//   return response;
// }

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.SERVICE_ROLE_KEY;

  const supabase = createRouteHandlerClient({ cookies });
  try {
    // const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     apikey: SUPABASE_KEY!,
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });

    const response = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
      // },
    });

    console.log("response : ", response);

    console.log("User signed up:");
    return response;
  } catch (error) {
    console.log("Error signing up:", error);
    return null;
  }
}
