import {z} from "zod";
export const schemaZod = z.object({
  name: z.string()
        .min(3,'nome deve ter no minimo 3 caracteres'),
  email: z.string().trim()
        .email("E-mail inválido")
        .refine((value)=> value.length !== 0,{message:'error:campo vazio'}),
  password:z.string().trim()
          .min(8, 'A senha deve ter ao menos 8 dígitos')
          .refine((value)=> value.length !== 0,{message:'error:campo vazio'}),
 // passwordConfirm: z.string().trim()
 //       .refine((value)=> value.length !== 0,{message:'error:campo vazio'}),
  telefone: z.string().trim().
          min(9,'nome deve ter no minimo 8 caracteres'),
  minicurriculo: z.string().optional(),
  urlsite: z.string().optional(),
  curriculo_redesocial: z.string().optional(),
  ehPalestrante: z.number(),
  
})
/*.refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords não são iguais",
  path: ["passwordConfirm"], // path of error
});*/

export type IRegisterUser = z.infer<typeof schemaZod>; 