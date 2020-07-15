const modalStatistic = (info) => {
  const template = `<button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary">Все результаты</button>
                      <!-- Modal-->
                      <div id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
                        <div role="document" class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h4 id="exampleModalLabel" class="modal-title">Все результаты</h4>
                              <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                            </div>
                            <div class="modal-body">
                              <p>Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                          </div>
                        </div>
                      </div>`;
  const modal = document.createElement('div');
  modal.className = 'card-body text-center';
  modal.innerHTML = template;
  return modal;
};

export default modalStatistic;
