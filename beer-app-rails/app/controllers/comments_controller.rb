class CommentsController < ApplicationController
  def index
    @comments=Comment.all
    respond_to do |format|
      format.html  {render :index }
      format.json  {render json: @comments }
    end
  end
  def new
    @comment=Comment.new
  end
  def create
    # @comment=Comment.create!(comment_params)
    # redirect_to comment_path(@comment)
    @comment = Comment.new(comment_params)
      respond_to do |format|
        if @comment.save!
          format.html { redirect_to comment_path(@comment), notice: 'Comment was successfully created.' }
          format.json { render json: @comment, status: :created }
        else
          format.html { render :new }
          format.json { render json: @comment.errors, status: :unprocessable_entity }
        end
      end
  end
  def show
    @comment=Comment.find(params[:id])
    respond_to do |format|
      format.html { render :show}
      format.json { render json: @comment}
  end
  end
  def edit
    @comment=Comment.find(params[:id])
  end
  def update
    @comment=Comment.find(params[:id])
    # @comment.update(comment_params)
    # redirect_to comment_path(@comment)

    respond_to do |format|
    if @comment.update!(comment_params)
      format.html { redirect_to comment_path(@comment), notice: 'Comment was successfully updated.' }
      format.json { render json: @comment }
    else
      format.html { render :new }
      format.json { render json: @comment.errors, status: :unprocessable_entity }
    end
  end
  end

  def destroy
    @comment=Comment.find(params[:id])
    # @comment.destroy
    # redirect_to comments_path
    respond_to do |format|
      if @comment.destroy
        format.html {redirect_to comments_path, notice: 'Comment was successfully deleted.'}
        format.json {render json: @comments}
      else
        format.html { redirect_to comments_path, notice: 'Comment was not successfully deleted.' }
        format.json { render json: @comments.errors, status: :unprocessable_entity }
      end
    end

    redirect_to comments_path
  end
  private
  def comment_params
    params.require(:comment).permit(:title, :body)
  end
end
