/// <reference path="googleappsscript.types.d.ts" />
/// <reference path="googleappsscript.base.d.ts" />

declare module GoogleAppsScript {
  export module Forms {
    /**
     * Allows a script to open existing Forms or create new ones.
     * 
     *      // Open a form by ID.
     *      var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *     
     *      // Create and open a form.
     *      var newForm = FormApp.create('Form Name');
     */
    export interface FormApp {
      Alignment: Alignment
      DestinationType: DestinationType
      ItemType: ItemType
      PageNavigationType: PageNavigationType
      create(title: String): Form;
      getActiveForm(): Form;
      getUi(): Base.Ui;
      openById(id: String): Form;
      openByUrl(url: String): Form;
    }

    /**
     * A question item that allows the respondent to indicate a date and time. Items can be accessed or
     *  created from a Form.
     * 
     *      // Open a form by ID and add a new date-time item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addDateTimeItem();
     *      item.setTitle('When do you want to meet?');
     */
    export interface DateTimeItem {
      createResponse(response: Date): ItemResponse;
      duplicate(): DateTimeItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      includesYear(): Boolean;
      isRequired(): Boolean;
      setHelpText(text: String): DateTimeItem;
      setIncludesYear(enableYear: Boolean): DateTimeItem;
      setRequired(enabled: Boolean): DateTimeItem;
      setTitle(title: String): DateTimeItem;
    }

    /**
     * A single choice associated with a type of Item that supports choices, like
     *  CheckboxItem, ListItem, or MultipleChoiceItem.
     * 
     *      // Create a new form and add a multiple-choice item.
     *      var form = FormApp.create('Form Name');
     *      var item = form.addMultipleChoiceItem();
     *      item.setTitle('Do you prefer cats or dogs?')
     *          .setChoices([
     *              item.createChoice('Cats', FormApp.PageNavigationType.CONTINUE),
     *              item.createChoice('Dogs', FormApp.PageNavigationType.RESTART)
     *          ]);
     *     
     *      // Add another page because navigation has no effect on the last page.
     *      form.addPageBreakItem().setTitle('You chose well!');
     *     
     *      // Log the navigation types that each choice results in.
     *      var choices = item.getChoices();
     *      for (var i = 0; i < choices.length; i++) {
     *      Logger.log('If the respondent chooses "%s", the form will %s.',
     *                 choices[i].getValue(),
     *                 choices[i].getPageNavigationType());
     *      }
     */
    export interface Choice {
      getGotoPage(): PageBreakItem;
      getPageNavigationType(): PageNavigationType;
      getValue(): String;
    }

    /**
     * A question item that allows the respondent to indicate a date. Items can be accessed or created
     *  from a Form.
     * 
     *      // Open a form by ID and add a new date item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addDateItem();
     *      item.setTitle('When were you born?');
     */
    export interface DateItem {
      createResponse(response: Date): ItemResponse;
      duplicate(): DateItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      includesYear(): Boolean;
      isRequired(): Boolean;
      setHelpText(text: String): DateItem;
      setIncludesYear(enableYear: Boolean): DateItem;
      setRequired(enabled: Boolean): DateItem;
      setTitle(title: String): DateItem;
    }

    /**
     * A question item that allows the respondent to select one or more checkboxes, as well as an
     *  optional "other" field. Items can be accessed or created from a Form.
     * 
     *      // Open a form by ID and add a new checkbox item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addCheckboxItem();
     *      item.setTitle('What condiments would you like on your hot dog?')
     *          .setChoices([
     *                item.createChoice('Ketchup'),
     *                item.createChoice('Mustard'),
     *                item.createChoice('Relish')
     *          ])
     *          .showOtherOption(true);
     */
    export interface CheckboxItem {
      createChoice(value: String): Choice;
      createResponse(responses: String[]): ItemResponse;
      duplicate(): CheckboxItem;
      getChoices(): Choice[];
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      hasOtherOption(): Boolean;
      isRequired(): Boolean;
      setChoiceValues(values: String[]): CheckboxItem;
      setChoices(choices: Choice[]): CheckboxItem;
      setHelpText(text: String): CheckboxItem;
      setRequired(enabled: Boolean): CheckboxItem;
      setTitle(title: String): CheckboxItem;
      showOtherOption(enabled: Boolean): CheckboxItem;
    }

    /**
     * A response to the form as a whole. Form responses have three main uses: they contain the answers
     *  submitted by a respondent (see getItemResponses(), they can be used to programmatically
     *  respond to the form (see withItemResponse(response) and submit()), and they
     *  can be used as a template to create a URL for the form with pre-filled answers. Form responses
     *  can be created or accessed from a Form.
     * 
     *      // Open a form by ID and log the responses to each question.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var formResponses = form.getResponses();
     *      for (var i = 0; i < formResponses.length; i++) {
     *        var formResponse = formResponses[i];
     *        var itemResponses = formResponse.getItemResponses();
     *        for (var j = 0; j < itemResponses.length; j++) {
     *          var itemResponse = itemResponses[j];
     *          Logger.log('Response #%s to the question "%s" was "%s"',
     *              (i + 1).toString(),
     *              itemResponse.getItem().getTitle(),
     *              itemResponse.getResponse());
     *        }
     *      }
     */
    export interface FormResponse {
      getEditResponseUrl(): String;
      getId(): String;
      getItemResponses(): ItemResponse[];
      getRespondentEmail(): String;
      getResponseForItem(item: Item): ItemResponse;
      getTimestamp(): Date;
      submit(): FormResponse;
      toPrefilledUrl(): String;
      withItemResponse(response: ItemResponse): FormResponse;
    }

    /**
     * A question item, presented as a grid of columns and rows, that allows the respondent to select
     *  one choice per row from a sequence of radio buttons. Items can be accessed or created from a
     *  Form.
     * 
     *      // Open a form by ID and add a new grid item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addGridItem();
     *      item.setTitle('Rate your interests')
     *          .setRows(['Cars', 'Computers', 'Celebrities'])
     *          .setColumns(['Boring', 'So-so', 'Interesting']);
     */
    export interface GridItem {
      createResponse(responses: String[]): ItemResponse;
      duplicate(): GridItem;
      getColumns(): String[];
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getRows(): String[];
      getTitle(): String;
      getType(): ItemType;
      isRequired(): Boolean;
      setColumns(columns: String[]): GridItem;
      setHelpText(text: String): GridItem;
      setRequired(enabled: Boolean): GridItem;
      setRows(rows: String[]): GridItem;
      setTitle(title: String): GridItem;
    }

    /**
     * A question item that allows the respondent to indicate a length of time. Items can be accessed or
     *  created from a Form.
     * 
     *      // Open a form by ID and add a new duration item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addDurationItem();
     *      item.setTitle('How long can you hold your breath?');
     */
    export interface DurationItem {
      createResponse(hours: Integer, minutes: Integer, seconds: Integer): ItemResponse;
      duplicate(): DurationItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      isRequired(): Boolean;
      setHelpText(text: String): DurationItem;
      setRequired(enabled: Boolean): DurationItem;
      setTitle(title: String): DurationItem;
    }

    /**
     * A form that contains overall properties (such as title, settings, and where responses are stored)
     *  and items (which includes question items like checkboxes and layout items like page breaks).
     *  Forms can be accessed or created from FormApp.
     * 
     *      // Open a form by ID and create a new spreadsheet.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var ss = SpreadsheetApp.create('Spreadsheet Name');
     *     
     *      // Update form properties via chaining.
     *      form.setTitle('Form Name')
     *          .setDescription('Description of form')
     *          .setConfirmationMessage('Thanks for responding!')
     *          .setAllowResponseEdits(true)
     *          .setAcceptingResponses(false);
     *     
     *      // Update the form's response destination.
     *      form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
     */
    export interface Form {
      addCheckboxItem(): CheckboxItem;
      addDateItem(): DateItem;
      addDateTimeItem(): DateTimeItem;
      addDurationItem(): DurationItem;
      addEditor(emailAddress: String): Form;
      addEditor(user: Base.User): Form;
      addEditors(emailAddresses: String[]): Form;
      addGridItem(): GridItem;
      addImageItem(): ImageItem;
      addListItem(): ListItem;
      addMultipleChoiceItem(): MultipleChoiceItem;
      addPageBreakItem(): PageBreakItem;
      addParagraphTextItem(): ParagraphTextItem;
      addScaleItem(): ScaleItem;
      addSectionHeaderItem(): SectionHeaderItem;
      addTextItem(): TextItem;
      addTimeItem(): TimeItem;
      addVideoItem(): VideoItem;
      canEditResponse(): Boolean;
      collectsEmail(): Boolean;
      createResponse(): FormResponse;
      deleteAllResponses(): Form;
      deleteItem(index: Integer): void;
      deleteItem(item: Item): void;
      getConfirmationMessage(): String;
      getCustomClosedFormMessage(): String;
      getDescription(): String;
      getDestinationId(): String;
      getDestinationType(): DestinationType;
      getEditUrl(): String;
      getEditors(): Base.User[];
      getId(): String;
      getItemById(id: Integer): Item;
      getItems(): Item[];
      getItems(itemType: ItemType): Item[];
      getPublishedUrl(): String;
      getResponse(responseId: String): FormResponse;
      getResponses(): FormResponse[];
      getResponses(timestamp: Date): FormResponse[];
      getShuffleQuestions(): Boolean;
      getSummaryUrl(): String;
      getTitle(): String;
      hasLimitOneResponsePerUser(): Boolean;
      hasProgressBar(): Boolean;
      hasRespondAgainLink(): Boolean;
      isAcceptingResponses(): Boolean;
      isPublishingSummary(): Boolean;
      moveItem(from: Integer, to: Integer): Item;
      moveItem(item: Item, toIndex: Integer): Item;
      removeDestination(): Form;
      removeEditor(emailAddress: String): Form;
      removeEditor(user: Base.User): Form;
      requiresLogin(): Boolean;
      setAcceptingResponses(enabled: Boolean): Form;
      setAllowResponseEdits(enabled: Boolean): Form;
      setCollectEmail(collect: Boolean): Form;
      setConfirmationMessage(message: String): Form;
      setCustomClosedFormMessage(message: String): Form;
      setDescription(description: String): Form;
      setDestination(type: DestinationType, id: String): Form;
      setLimitOneResponsePerUser(enabled: Boolean): Form;
      setProgressBar(enabled: Boolean): Form;
      setPublishingSummary(enabled: Boolean): Form;
      setRequireLogin(requireLogin: Boolean): Form;
      setShowLinkToRespondAgain(enabled: Boolean): Form;
      setShuffleQuestions(shuffle: Boolean): Form;
      setTitle(title: String): Form;
      shortenFormUrl(url: String): String;
    }

    /**
     * A response to one question item within a form. Item responses can be accessed from
     *  FormResponse and created from any Item that asks the respondent to answer a
     *  question.
     * 
     *      // Open a form by ID and log the responses to each question.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var formResponses = form.getResponses();
     *      for (var i = 0; i < formResponses.length; i++) {
     *        var formResponse = formResponses[i];
     *        var itemResponses = formResponse.getItemResponses();
     *        for (var j = 0; j < itemResponses.length; j++) {
     *          var itemResponse = itemResponses[j];
     *          Logger.log('Response #%s to the question "%s" was "%s"',
     *              (i + 1).toString(),
     *              itemResponse.getItem().getTitle(),
     *              itemResponse.getResponse());
     *        }
     *      }
     */
    export interface ItemResponse {
      getItem(): Item;
      getResponse(): Object;
    }

    /**
     * A layout item that displays an image. Items can be accessed or created from a Form.
     * 
     *      // Open a form by ID and add a new image item
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var img = UrlFetchApp.fetch('https://www.google.com/images/srpr/logo4w.png');
     *      form.addImageItem()
     *          .setTitle('Google')
     *          .setHelpText('Google Logo') // The help text is the image description
     *          .setImage(img);
     */
    export interface ImageItem {
      duplicate(): ImageItem;
      getAlignment(): Alignment;
      getHelpText(): String;
      getId(): Integer;
      getImage(): Base.Blob;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      getWidth(): Integer;
      setAlignment(alignment: Alignment): ImageItem;
      setHelpText(text: String): ImageItem;
      setImage(image: Base.BlobSource): ImageItem;
      setTitle(title: String): ImageItem;
      setWidth(width: Integer): ImageItem;
    }

    /**
     * A question item that allows the respondent to select one choice from a list of radio buttons or
     *  an optional "other" field. Items can be accessed or created from a Form.
     * 
     *      // Open a form by ID and add a new multiple choice item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addMultipleChoiceItem();
     *      item.setTitle('Do you prefer cats or dogs?')
     *          .setChoices([
     *              item.createChoice('Cats'),
     *              item.createChoice('Dogs')
     *           ])
     *          .showOtherOption(true);
     */
    export interface MultipleChoiceItem {
      createChoice(value: String): Choice;
      createChoice(value: String, navigationItem: PageBreakItem): Choice;
      createChoice(value: String, navigationType: PageNavigationType): Choice;
      createResponse(response: String): ItemResponse;
      duplicate(): MultipleChoiceItem;
      getChoices(): Choice[];
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      hasOtherOption(): Boolean;
      isRequired(): Boolean;
      setChoiceValues(values: String[]): MultipleChoiceItem;
      setChoices(choices: Choice[]): MultipleChoiceItem;
      setHelpText(text: String): MultipleChoiceItem;
      setRequired(enabled: Boolean): MultipleChoiceItem;
      setTitle(title: String): MultipleChoiceItem;
      showOtherOption(enabled: Boolean): MultipleChoiceItem;
    }

    /**
     * A question item that allows the respondent to enter a block of text. Items can be accessed or
     *  created from a Form.
     * 
     *      // Open a form by ID and add a new paragraph text item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addParagraphTextItem();
     *      item.setTitle('What is your address?');
     */
    export interface ParagraphTextItem {
      createResponse(response: String): ItemResponse;
      duplicate(): ParagraphTextItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      isRequired(): Boolean;
      setHelpText(text: String): ParagraphTextItem;
      setRequired(enabled: Boolean): ParagraphTextItem;
      setTitle(title: String): ParagraphTextItem;
    }

    /**
     * A generic form item that contains properties common to all items, such as title and help text.
     *  Items can be accessed or created from a Form.
     * 
     *  To operate on type-specific properties, use getType() to check the item's
     *  ItemType, then cast the item to the
     *  appropriate class using a method like asCheckboxItem().
     * 
     *      // Create a new form and add a text item.
     *      var form = FormApp.create('Form Name');
     *      form.addTextItem();
     *     
     *      // Access the text item as a generic item.
     *      var items = form.getItems();
     *      var item = items[0];
     *     
     *      // Cast the generic item to the text-item class.
     *      if (item.getType() == 'TEXT') {
     *        var textItem = item.asTextItem();
     *        textItem.setRequired(false);
     *      }
     */
    export interface Item {
      asCheckboxItem(): CheckboxItem;
      asDateItem(): DateItem;
      asDateTimeItem(): DateTimeItem;
      asDurationItem(): DurationItem;
      asGridItem(): GridItem;
      asImageItem(): ImageItem;
      asListItem(): ListItem;
      asMultipleChoiceItem(): MultipleChoiceItem;
      asPageBreakItem(): PageBreakItem;
      asParagraphTextItem(): ParagraphTextItem;
      asScaleItem(): ScaleItem;
      asSectionHeaderItem(): SectionHeaderItem;
      asTextItem(): TextItem;
      asTimeItem(): TimeItem;
      asVideoItem(): VideoItem;
      duplicate(): Item;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      setHelpText(text: String): Item;
      setTitle(title: String): Item;
    }

    /**
     * A layout item that marks the start of a page. Items can be accessed or
     *  created from a Form.
     * 
     *      // Create a form and add three page-break items.
     *      var form = FormApp.create('Form Name');
     *      var pageTwo = form.addPageBreakItem().setTitle('Page Two');
     *      var pageThree = form.addPageBreakItem().setTitle('Page Three');
     *     
     *      // Make the first two pages navigate elsewhere upon completion. 
     *      pageTwo.setGoToPage(pageThree); // At end of page one (start of page two), jump to page three
     *      pageThree.setGoToPage(FormApp.PageNavigationType.RESTART); // At end of page two, restart form
     */
    export interface PageBreakItem {
      duplicate(): PageBreakItem;
      getGoToPage(): PageBreakItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getPageNavigationType(): PageNavigationType;
      getTitle(): String;
      getType(): ItemType;
      setGoToPage(goToPageItem: PageBreakItem): PageBreakItem;
      setGoToPage(navigationType: PageNavigationType): PageBreakItem;
      setHelpText(text: String): PageBreakItem;
      setTitle(title: String): PageBreakItem;
    }

    /**
     * A question item that allows the respondent to select one choice from a drop-down list. Items can
     *  be accessed or created from a Form.
     * 
     *      // Open a form by ID and add a new list item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addListItem();
     *      item.setTitle('Do you prefer cats or dogs?')
     *          .setChoices([
     *              item.createChoice('Cats'),
     *              item.createChoice('Dogs')
     *          ]);
     */
    export interface ListItem {
      createChoice(value: String): Choice;
      createChoice(value: String, navigationItem: PageBreakItem): Choice;
      createChoice(value: String, navigationType: PageNavigationType): Choice;
      createResponse(response: String): ItemResponse;
      duplicate(): ListItem;
      getChoices(): Choice[];
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      isRequired(): Boolean;
      setChoiceValues(values: String[]): ListItem;
      setChoices(choices: Choice[]): ListItem;
      setHelpText(text: String): ListItem;
      setRequired(enabled: Boolean): ListItem;
      setTitle(title: String): ListItem;
    }

    /**
     * A question item that allows the respondent to choose one option from a numbered sequence of radio
     *  buttons. Items can be accessed or created from a Form.
     * 
     *      // Open a form by ID and add a new scale item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addScaleItem();
     *      item.setTitle('Pick a number between 1 and 10')
     *          .setBounds(1, 10);
     */
    export interface ScaleItem {
      createResponse(response: Integer): ItemResponse;
      duplicate(): ScaleItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getLeftLabel(): String;
      getLowerBound(): Integer;
      getRightLabel(): String;
      getTitle(): String;
      getType(): ItemType;
      getUpperBound(): Integer;
      isRequired(): Boolean;
      setBounds(lower: Integer, upper: Integer): ScaleItem;
      setHelpText(text: String): ScaleItem;
      setLabels(lower: String, upper: String): ScaleItem;
      setRequired(enabled: Boolean): ScaleItem;
      setTitle(title: String): ScaleItem;
    }

    /**
     * A layout item that visually indicates the start of a section. Items can be accessed or created
     *  from a Form.
     * 
     *      // Open a form by ID and add a new section header.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addSectionHeaderItem();
     *      item.setTitle('Title of new section');
     */
    export interface SectionHeaderItem {
      duplicate(): SectionHeaderItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      setHelpText(text: String): SectionHeaderItem;
      setTitle(title: String): SectionHeaderItem;
    }

    /**
     * An enum representing the supported types of image alignment. Alignment types can be accessed from
     *  FormApp.Alignment.
     * 
     *      // Open a form by ID and add a new image item with alignment
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var img = UrlFetchApp.fetch('https://www.google.com/images/srpr/logo4w.png');
     *      form.addImageItem()
     *          .setImage(img)
     *          .setAlignment(FormApp.Alignment.CENTER);
     */
    export enum Alignment { LEFT, CENTER, RIGHT }

    /**
     * An enum representing the supported types of form-response destinations. All forms, including
     *  those that do not have a destination set explicitly,
     *  save
     *  a copy of responses in the form's response store. Destination types can be accessed from
     *  FormApp.DestinationType.
     * 
     *      // Open a form by ID and create a new spreadsheet.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var ss = SpreadsheetApp.create('Spreadsheet Name');
     *     
     *      // Update the form's response destination.
     *      form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
     */
    export enum DestinationType { SPREADSHEET }

    /**
     * A question item that allows the respondent to enter a single line of text. Items can be accessed
     *  or created from a Form.
     * 
     *      // Open a form by ID and add a new text item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addTextItem();
     *      item.setTitle('What is your name?');
     */
    export interface TextItem {
      createResponse(response: String): ItemResponse;
      duplicate(): TextItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      isRequired(): Boolean;
      setHelpText(text: String): TextItem;
      setRequired(enabled: Boolean): TextItem;
      setTitle(title: String): TextItem;
    }

    /**
     * An enum representing the supported types of page navigation. Page navigation types can be
     *  accessed from FormApp.PageNavigationType.
     * 
     * The page navigation occurs after the respondent completes a page that contains the option, and
     *  only if the respondent chose that option. If the respondent chose multiple options with
     *  page-navigation instructions on the same page, only the last navigation option has any effect.
     *  Page navigation also has no effect on the last page of a form.
     * Choices that use page navigation cannot be combined in the same item with choices that do not
     *  use page navigation.
     * 
     *      // Create a form and add a new multiple-choice item and a page-break item.
     *      var form = FormApp.create('Form Name');
     *      var item = form.addMultipleChoiceItem();
     *      var pageBreak = form.addPageBreakItem();
     *     
     *      // Set some choices with go-to-page logic.
     *      var rightChoice = item.createChoice('Vanilla', FormApp.PageNavigationType.SUBMIT);
     *      var wrongChoice = item.createChoice('Chocolate', FormApp.PageNavigationType.RESTART);
     *     
     *      // For GO_TO_PAGE, just pass in the page break item. For CONTINUE (normally the default), pass in
     *      // CONTINUE explicitly because page navigation cannot be mixed with non-navigation choices.
     *      var iffyChoice = item.createChoice('Peanut', pageBreak);
     *      var otherChoice = item.createChoice('Strawberry', FormApp.PageNavigationType.CONTINUE);
     *      item.setChoices([rightChoice, wrongChoice, iffyChoice, otherChoice]);
     */
    export enum PageNavigationType { CONTINUE, GO_TO_PAGE, RESTART, SUBMIT }

    /**
     * An enum representing the supported types of form items. Item types can be accessed from
     *  FormApp.ItemType.
     * 
     *      // Open a form by ID and add a new section header.
     *      var form = FormApp.create('Form Name');
     *      var item = form.addSectionHeaderItem();
     *      item.setTitle('Title of new section');
     *     
     *      // Check the item type.
     *      if (item.getType() == FormApp.ItemType.SECTION_HEADER) {
     *        item.setHelpText('Description of new section.');
     *      }
     */
    export enum ItemType { CHECKBOX, DATE, DATETIME, DURATION, GRID, IMAGE, LIST, MULTIPLE_CHOICE, PAGE_BREAK, PARAGRAPH_TEXT, SCALE, SECTION_HEADER, TEXT, TIME }

    /**
     * A question item that allows the respondent to indicate a time of day. Items can be accessed or
     *  created from a Form.
     * 
     *      // Open a form by ID and add a new time item.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      var item = form.addTimeItem();
     *      item.setTitle('What time do you usually wake up in the morning?');
     */
    export interface TimeItem {
      createResponse(hour: Integer, minute: Integer): ItemResponse;
      duplicate(): TimeItem;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      isRequired(): Boolean;
      setHelpText(text: String): TimeItem;
      setRequired(enabled: Boolean): TimeItem;
      setTitle(title: String): TimeItem;
    }

    /**
     * A layout item that displays a video. Items can be accessed or created from a Form.
     * 
     *      // Open a form by ID and add three new video items, using a long URL,
     *      // a short URL, and a video ID.
     *      var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
     *      form.addVideoItem()
     *          .setTitle('Video Title')
     *          .setHelpText('Video Caption')
     *          .setVideoUrl('www.youtube.com/watch?v=1234abcdxyz');
     *     
     *      form.addVideoItem()
     *          .setTitle('Video Title')
     *          .setHelpText('Video Caption')
     *          .setVideoUrl('youtu.be/1234abcdxyz');
     *     
     *      form.addVideoItem()
     *          .setTitle('Video Title')
     *          .setHelpText('Video Caption')
     *          .setVideoUrl('1234abcdxyz');
     */
    export interface VideoItem {
      duplicate(): VideoItem;
      getAlignment(): Alignment;
      getHelpText(): String;
      getId(): Integer;
      getIndex(): Integer;
      getTitle(): String;
      getType(): ItemType;
      getWidth(): Integer;
      setAlignment(alignment: Alignment): VideoItem;
      setHelpText(text: String): VideoItem;
      setTitle(title: String): VideoItem;
      setVideoUrl(youtubeUrl: String): VideoItem;
      setWidth(width: Integer): VideoItem;
    }

  }
}

declare var FormApp: GoogleAppsScript.Forms.FormApp;