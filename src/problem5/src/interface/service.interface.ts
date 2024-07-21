import { Router } from 'express';

interface Service {
  path: string;
  router: Router;
}

export default Service;