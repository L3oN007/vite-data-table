import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DialogUploaderDemo } from "@/components/upload/dialog-uploader-demo";
import { ReactHookFormDemo } from "@/components/upload/react-hook-form-demo";

function App() {
  return (
    <div className="m-10">
      <Tabs defaultValue="hook" className="w-full overflow-hidden">
        <TabsList>
          <TabsTrigger value="hook">React hook form</TabsTrigger>
          <TabsTrigger value="dialog">Dialog</TabsTrigger>
        </TabsList>

        <TabsContent value="hook" className="mt-6">
          <ReactHookFormDemo />
        </TabsContent>
        <TabsContent value="dialog" className="mt-6">
          <DialogUploaderDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
