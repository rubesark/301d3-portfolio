page('/',
  blogsController.loadAll,
  blogsController.index);

page('/about', aboutController.index);

page.start();
