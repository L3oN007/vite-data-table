"use client";

import * as React from "react";

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

import { FileUploader } from "@/components/file-uploader";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  images: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file?.size <= MAX_FILE_SIZE,
          `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024} MB.`
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, and .png files are supported."
        )
    )
    .min(1, "You must upload at least 1 image.")
    .max(4, "You can upload up to 4 images."),
});

type Schema = z.infer<typeof schema>;

export function ReactHookFormDemo() {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      images: [],
    },
  });

  function onSubmit(values: Schema) {
    try {
      setLoading(true);
      console.log(values);
    } catch {
      console.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name" />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  maxFileCount={4}
                  maxSize={MAX_FILE_SIZE}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
