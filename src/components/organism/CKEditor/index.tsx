import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEffect, useRef } from "react";

interface CKEditorProps {
  form: any;
  name: any;
  editorLoaded?: boolean;
}

export default function CKEditor({ form, name, editorLoaded }: CKEditorProps) {
  const editorRef = useRef<any>();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <div className="max-w-[500px]">
          <CKEditor
            editor={ClassicEditor}
            data={form.getValues(name)}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              form.setValue(name, data);
            }}
          />
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormMessage className="mt-3" />
              </FormItem>
            )}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
