type CartblogProps = {
  id?: number;     
  title ?:string;
  slug  ?:string; 
  likes ?: number;    

  authorId ?: number;
  author?: author;

  image     ?: string | null;
  description ?: string | null;
  content    ?: string | null;

  categoryId ?: number;
    category?: category;

  published ?: boolean;
  createdAt ?: Date;
  updatedAt ?: Date;
}
type author = {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string ;
        email: string ;
        password: string ;
        urlimage: string | null;
    }
type  category = {
        id: number;
        name: string ;
        color: string;
    };