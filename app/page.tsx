"use client";

import { useState } from "react";

import { upload } from "./upload";

export default function ServerUploadPage() {
  const [uploadResult, setUploadResult] = useState("");

  // strip public from path
  const filePath = uploadResult.replace(/^public/, "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const result = await upload(data);
    // handle the error
    // if (!response.ok) throw new Error(await response.text());
    // const result = await response.json();
    setUploadResult(result.path);

    console.log({ result });
  };

  return (
    <main>
      <h1>Kurcikowy uploader</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>

      {filePath && (
        <p style={{ marginTop: 20 }}>
          Plik wysłany na serwer:{" "}
          <a href={filePath} target="_blank">
            KLIK aby otworzyć w nowym oknie
          </a>
        </p>
      )}
    </main>
  );
}
