import {NextFunction, Request, Response} from 'express';
import {Article} from '../../types/LocalTypes';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
} from '../models/articleModel';
import CustomError from '../../classes/CustomError';

const articlesGet = (
  req: Request,
  res: Response<Article[]>,
  next: NextFunction,
) => {
  try {
    const articles = getAllArticles();
    res.json(articles);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const articleGet = (
  req: Request<{id: string}>,
  res: Response<Article>,
  next: NextFunction,
) => {
  try {
    const article = getArticle(Number(req.params.id));
    res.json(article);
  } catch (error) {
    next(new CustomError((error as Error).message, 404));
  }
};

const articlePost = (
  req: Request<unknown, unknown, Omit<Article, 'id'>>,
  res: Response<Article>,
  next: NextFunction,
) => {
  try {
    const article = createArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const articlePut = (
  req: Request<{id: string}, unknown, Omit<Article, 'id'>>,
  res: Response<Article>,
  next: NextFunction,
) => {
  try {
    const article = updateArticle(
      Number(req.params.id),
      req.body.title,
      req.body.description,
      req.body.author_id,
    );
    res.json(article);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const articleDelete = (
  req: Request<{id: string}>,
  res: Response<unknown>,
  next: NextFunction,
) => {
  try {
    deleteArticle(Number(req.params.id), Number(req.body.author_id));
    res.status(204).end();
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {articlesGet, articleGet, articlePost, articlePut, articleDelete};
