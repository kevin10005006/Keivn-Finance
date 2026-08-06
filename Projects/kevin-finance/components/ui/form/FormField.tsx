import { ReactNode } from "react";

interface FormFieldProps {
 label: string;
 children: ReactNode;
 required?: boolean;
}

export default function FormField({
 label,
 children,
 required = false,
}: FormFieldProps) {
 return (
   <div className="space-y-2">
     <label className="block text-sm font-medium text-gray-700">
       {label}

       {required && (
         <span className="ml-1 text-red-500">
           *
         </span>
       )}
     </label>

     {children}
   </div>
 );
}