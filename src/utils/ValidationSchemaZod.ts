import { z } from "zod";
export const schemaZod = z.object({
  name: z.string()
    .min(3, 'nome deve ter no minimo 3 caracteres'),
  email: z.string().trim()
    .email("E-mail inválido")
    .refine((value) => value.length !== 0, { message: 'error:campo vazio' }),
  password: z.string().trim()
    .min(8, 'A senha deve ter ao menos 8 dígitos')
    .refine((value) => value.length !== 0, { message: 'error:campo vazio' }),
  // passwordConfirm: z.string().trim()
  //       .refine((value)=> value.length !== 0,{message:'error:campo vazio'}),
  telefone: z.string().trim().
    min(9, 'telefone deve ter no minimo 9 caracteres'),
  minicurriculo: z.string().optional(),
  urlsite: z.string().optional(),
  curriculo_redesocial: z.string().optional(),
  ehPalestrante: z.number(),

})
/*.refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords não são iguais",
  path: ["passwordConfirm"], // path of error
});*/


export const schemaZodEvento = z.object({
  nome: z.string()
    .min(3, 'nome deve ter no minimo 3 caracteres')
    .refine((value) => value.length !== 0, { message: 'error:campo vazio' }),
  descricao: z.string()
    .min(3, 'descricao deve ter no mínimo 3 caracteres')
    .refine((value) => value.length !== 0, { message: 'error:campo vazio' }),
  data_hora: z.string()
    .refine((value) => value.length !== 0, { message: 'error:campo vazio' }),
  urlsiteoficial: z.string().trim()
    .refine((value) => value.length !== 0, { message: 'error:campo vazio' }),
  //categoria: z.string().trim()
  //  .refine((value) => value.length !== 0, { message: 'error:campo vazio' }),
  //site: z.string().optional(),
  //Colocar os outros campos depois
})


export type IRegisterUser = z.infer<typeof schemaZod>; 
export type IRegisterEvent = z.infer<typeof schemaZodEvento>;